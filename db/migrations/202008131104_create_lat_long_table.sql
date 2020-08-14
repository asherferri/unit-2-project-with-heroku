CREATE TABLE IF NOT EXISTS launch_extended (
    id SERIAL PRIMARY KEY,
    latitude VARCHAR(255) NOT NULL,
    longitude VARCHAR(255) NOT NULL,
    launch_id INTEGER,
    FOREIGN KEY (launch_id) REFERENCES launch(id)
);