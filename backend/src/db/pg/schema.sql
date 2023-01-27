-- Create tables
-- bins.bin_id is a UUID string
CREATE TABLE bins (
    id     SERIAL PRIMARY KEY,
    bin_id VARCHAR(255) NOT NULL,
    name   VARCHAR(255) NOT NULL
);

-- requests.bin_id_fk is an integer, a foreign key to the bins table
CREATE TABLE requests (
    id                    SERIAL PRIMARY KEY,
    bin_id_fk             INTEGER NOT NULL REFERENCES bins (id) ON DELETE CASCADE,
    request_id            VARCHAR(255) NOT NULL,
    created_at            TIMESTAMPTZ DEFAULT now(),
    header_accept         TEXT,
    header_content_length TEXT,
    header_content_type   TEXT,
    header_host           TEXT,
    header_user_agent     TEXT,
    method                TEXT,
    path                  TEXT
);