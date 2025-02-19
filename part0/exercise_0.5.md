```mermaid

sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: JS file
    deactivate server

    activate browser
    note right of browser: Executes javascript from main.js
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    deactivate browser

    activate server
    note left of server: Retrieves notes from database and sends response data as JSON
    server->>browser: [{"content": "HTML is easy", "date": "2025-1-1"}, ...]
    deactivate server

    activate browser
    note right of browser: Browser executes callback
    note right of browser: saves notes data
    note right of browser: redrawNotes to update page
    deactivate browser

```