$(document).ready(function () {
    let soundEnabled = true; 

    // Event für den Sound-Button
    $('#sound-toggle').on('click', function () {
        soundEnabled = !soundEnabled; 
        $(this).text(soundEnabled ? '🔊 Sound An' : '🔇 Sound Aus'); 
    });

    // Farbzuteilung für die Gruppen
    const colorMap = {
        'a': 'var(--color-a)', // Farbe für Gruppe A
        'b': 'var(--color-b)', // Farbe für Gruppe B
        'c': 'var(--color-c)', // Farbe für Gruppe C
        'd': 'var(--color-d)', // Farbe für Gruppe D
        'e': 'var(--color-e)', // Farbe für Gruppe E
        'f': 'var(--color-f)', // Farbe für Gruppe F
        'g': 'var(--color-g)', // Farbe für Gruppe G
        'h': 'var(--color-h)'  // Farbe für Gruppe H
    };

    // Funktion zum Rendern der Karten
    function renderCards(sortedData) {
        $('#wrapper').empty(); // Leere den Kartenbereich
        $.each(sortedData, function (index, animal) {
            let group = animal.group.toLowerCase(); 
            let groupColor = colorMap[group] || 'var(--dark-color)'; 

            let divBox = $(`
                <div class="card-wrapper" data-id="${animal.id}" style="background-color: ${groupColor}; opacity: 1;">
                    <div class="card-content">
                        <div class="card-header">
                            <div class="card-number">${animal.group}${animal.group_number}</div>
                            <div class="card-title">${animal.name_german}</div>
                        </div>
                        <img src="${animal.image}" alt="${animal.name_german}" class="card-image" />
                        <div class="card-trivia">${animal.trivia_german}</div>
                        <div class="card-statistics">
                            <div class="statistics-pair">
                                <div class="stat-name">
                                    <img src="images/icons/weight.png" alt="weight">
                                </div>
                                <div class="stat-value">${animal.max_weight}</div>
                            </div>
                            <div class="statistics-pair">
                                <div class="stat-name">
                                    <img src="images/icons/length.png" alt="length">
                                </div>
                                <div class="stat-value">${animal.max_length}</div>
                            </div>
                            <div class="statistics-pair">
                                <div class="stat-name">
                                    <img src="images/icons/age.png" alt="maximum age">
                                </div>
                                <div class="stat-value">${animal.max_age}</div>
                            </div>
                            <div class="statistics-pair">
                                <div class="stat-name">
                                    <img src="images/icons/speed.png" alt="maximum speed">
                                </div>
                                <div class="stat-value">${animal.top_speed}</div>
                            </div>
                            <div class="statistics-pair">
                                <div class="stat-name">
                                    <img src="images/icons/land.png" alt="herkunft">
                                </div>
                                <div class="stat-value">${animal.continents}</div>
                            </div>
                            <div class="statistics-pair">
                                <div class="stat-name">
                                    <img src="images/icons/death.png" alt="caused human casualties per year">
                                </div>
                                <div class="stat-value">${animal.deaths}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
            $('#wrapper').append(divBox); 
        });
    }

    // Sortieren der Karten basierend auf der Auswahl im Dropdown-Menü
    $('#sort-select').on('change', function () {
        const sortBy = $(this).val(); 

        // Sortiere die Daten
        const sortedData = [...data].sort(function (a, b) {
            if (sortBy === 'weight') return b.max_weight - a.max_weight; 
            if (sortBy === 'length') return b.max_length - a.max_length; 
            if (sortBy === 'age') return b.max_age - a.max_age; 
            if (sortBy === 'speed') return b.top_speed - a.top_speed; 
            return a.id - b.id; 
        });

        renderCards(sortedData); 
    });
    renderCards(data);
});


