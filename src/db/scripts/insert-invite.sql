INSERT INTO invites (
    redeem_code,
    uses_left,
    expires_at,
    user_verification_cooldown_days
) VALUES (
    'LESGOBOI',
    9999,
    NOW() + interval '30 days',
    7
);