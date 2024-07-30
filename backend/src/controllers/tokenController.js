const { getConnection } = require('../models/db');
const RtcTokenBuilder = require('agora-token');
const { RtcRole } = require('agora-token');

const APP_ID = 'e947c59bbe8c4287954cb154e63be817';
const APP_CERTIFICATE = '95f38223d7e84dd58236f7bd09b85096';

const generateToken = async (req, res) => {
    const { channelName, uid, role, user_email } = req.body;

    if (!channelName || uid === undefined || !role || !user_email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimeInSeconds = 3600;

    let roleEnum;
    if (role === 'publisher') {
        roleEnum = RtcRole.PUBLISHER;
    } else {
        roleEnum = RtcRole.SUBSCRIBER;
    }

    try {
        const connection = getConnection();
        const tokenWithUid = RtcTokenBuilder.RtcTokenBuilder.buildTokenWithUid(
            APP_ID, APP_CERTIFICATE, channelName, uid, roleEnum, expirationTimeInSeconds, currentTimestamp + expirationTimeInSeconds
        );

        const [sessionRows] = await connection.execute('SELECT session_id FROM session WHERE agora_channel_id = ?', [channelName]);

        if (sessionRows.length === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const sessionId = sessionRows[0].session_id;

        const [tokenRows] = await connection.execute(
            'SELECT token_id FROM session_token WHERE session_id = ? AND user_id = ? AND user_email = ?',
            [sessionId, uid, user_email]
        );

        if (tokenRows.length > 0) {
            await connection.execute('UPDATE session_token SET token = ? WHERE token_id = ?', [tokenWithUid, tokenRows[0].token_id]);
        } else {
            await connection.execute(
                'INSERT INTO session_token (session_id, user_id, user_email, token) VALUES (?, ?, ?, ?)',
                [sessionId, uid, user_email, tokenWithUid]
            );
        }

        res.json({
            token: tokenWithUid,
            session_id: sessionId,
            user_id: uid,
            user_email: user_email,
            role: role
        });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ error: 'Error generating token' });
    }
};

module.exports = { generateToken };
