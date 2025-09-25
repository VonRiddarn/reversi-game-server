DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO reversi_backend_user;
ALTER SCHEMA public OWNER TO reversi_backend_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO reversi_backend_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO reversi_backend_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO reversi_backend_user;