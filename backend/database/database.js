const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('./database/database.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to the database: ', err.message)
    }

    else {
        console.log('Connected to the database!')
        createTables()
    }
})

function createTables() {
    db.serialize(() => {
        db.run(`
                CREATE TABLE IF NOT EXISTS Polls(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    options TEXT UNIQUE NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                
                )
            `, (err) => {
            if (err) {
                console.error('Failed to create polls table: ', err.message)
            }
            else {
                console.log('Polls table ready!')
            }
        })
    })

    db.run(`
            CREATE TABLE IF NOT EXISTS votes(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                voter TEXT NOT NULL,
                vote TEXT NOT NULL,
                poll_id INTEGER,
                FOREIGN KEY (poll_id) REFERENCES Polls(id) ON DELETE CASCADE
            )
        
        `, (err) => {
        if (err) {
            console.error('Failed to create votes table: ', err.message)
        }
        else {
            console.log('votes table ready!')
        }
    })

    db.run(`
            CREATE TABLE IF NOT EXISTS voter(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                voter_ip TEXT NOT NULL,
                voted BOOLEAN NOT NULL
            )
        
        `, (err) => {
        if (err) {
            console.error('Failed to create voter table: ', err.message)
        }
        else {
            console.log('voter table ready!')
        }
    })
}

module.export = db