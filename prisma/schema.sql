CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Freight (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    rate REAL NOT NULL,
    type TEXT, -- e.g., Container, Pallet, Parcel
    weight_kg REAL,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    tracking_number TEXT UNIQUE,
    total_cost REAL NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, in-transit, delivered, cancelled
    origin TEXT,
    destination TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Shipment_Items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    shipment_id INTEGER,
    freight_id INTEGER,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(shipment_id) REFERENCES Shipments(id),
    FOREIGN KEY(freight_id) REFERENCES Freight(id)
);

-- Insert dummy admin user if not exists (password: admin123)
INSERT OR IGNORE INTO Users (id, name, email, password, role) VALUES 
(1, 'Logistics Admin', 'admin@example.com', '$2b$10$C8.k9U9hHqB.3kF46Vd00umT78Ea.YJ8wQkP2T.QyU.Z9m.S.W/8i', 'admin');

-- Insert initial freight types
INSERT OR IGNORE INTO Freight (id, name, description, rate, type, weight_kg, image) VALUES 
(1, 'FTL (Full Truckload)', 'Dedicated truck for large volume shipments over land.', 1200.00, 'Road Transport', 22000, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80'),
(2, 'LTL (Less Than Truckload)', 'Consolidated road transport for smaller shipments.', 150.00, 'Road Transport', 500, 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=500&q=80'),
(3, 'FCL (Full Container Load)', 'Exclusive use of a sea container for maritime shipping.', 2500.00, 'Sea Logistics', 28000, 'https://images.unsplash.com/photo-1590243677420-569b9173f46f?w=500&q=80'),
(4, 'Air Freight (Express)', 'Rapid global delivery via premium aerial network.', 350.00, 'Air Cargo', 100, 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=500&q=80'),
(5, 'Contract Logistics (Fulfillment)', 'End-to-end warehouse fulfillment and distribution.', 45.00, 'Warehousing', 50, 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80');
