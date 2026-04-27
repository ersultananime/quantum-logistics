const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');

const newFreights = [
  [1, 'FTL (Full Truckload)', 'Dedicated truck for large volume shipments over land.', 1200.00, 'Road Transport', 22000, 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80'],
  [2, 'LTL (Less Than Truckload)', 'Consolidated road transport for smaller shipments.', 150.00, 'Road Transport', 500, 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=500&q=80'],
  [3, 'FCL (Full Container Load)', 'Exclusive use of a sea container for maritime shipping.', 2500.00, 'Sea Logistics', 28000, 'https://images.unsplash.com/photo-1590243677420-569b9173f46f?w=500&q=80'],
  [4, 'Air Freight (Express)', 'Rapid global delivery via premium aerial network.', 350.00, 'Air Cargo', 100, 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=500&q=80'],
  [5, 'Contract Logistics (Fulfillment)', 'End-to-end warehouse fulfillment and distribution.', 45.00, 'Warehousing', 50, 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80']
];

db.serialize(() => {
  db.run('DELETE FROM Freight', () => {
    const stmt = db.prepare('INSERT INTO Freight (id, name, description, rate, type, weight_kg, image) VALUES (?, ?, ?, ?, ?, ?, ?)');
    newFreights.forEach(f => stmt.run(f));
    stmt.finalize(() => {
      console.log('Database seeded successfully');
      db.close();
    });
  });
});
