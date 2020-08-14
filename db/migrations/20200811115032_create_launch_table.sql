CREATE TABLE IF NOT EXISTS launch (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    launch_date VARCHAR(255) NOT NULL,
    launch_time VARCHAR(255) NOT NULL,
    lsp VARCHAR(255) NOT NULL,
    pad VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    cc VARCHAR(255),
    mission TEXT
);