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

    // Karten erstellen, aber vorerst unsichtbar machen
    data.sort((a, b) => a.id - b.id);
    $.each(data, function (index, animal) {
        let group = animal.group.toLowerCase();
        let groupColor = colorMap[group] || 'var(--dark-color)';

        let divBox = $(`
            <div class="card-wrapper" data-id="${animal.id}" style="background-color: ${groupColor}; opacity: 0;">
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

    // Event-Listener für den Button "Weiter"
    $('#continue-button').on('click', function () {
        $('#welcome-overlay').fadeOut(300, function () {
            // Karten einzeln mit Verzögerung anzeigen
            const cards = $('.card-wrapper');
            cards.each(function (index) {
                $(this).delay(index * 200).animate({ opacity: 1 }, 400);
            });
        });
    });

    // Hover-Effekt für Sound
    $('.card-wrapper').on('mouseenter', function () {
        if (!soundEnabled) return;

        const cardId = $(this).data('id');
        const animal = data.find(item => item.id === cardId);

        if (animal && animal.sound) {
            const audio = new Audio(animal.sound);
            audio.play();

            // Stoppt den Sound, wenn der Nutzer die Karte verlässt
            $(this).on('mouseleave', function () {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    });
});

$(document).ready(function () {
    // Filter-Elemente
    const continentSelect = $('#continent-select');
    const weightInput = $('#weight-range');
    const applyFiltersButton = $('#apply-filters');

    // Funktion zum Anwenden der Filter
    function applyFilters() {
        const selectedContinent = continentSelect.val();
        const maxWeight = parseInt(weightInput.val()) || Infinity;

        // Karten filtern
        $('.card-wrapper').each(function () {
            const cardId = $(this).data('id');
            const animal = data.find(item => item.id === cardId);

            // Filterbedingungen prüfen
            const matchesContinent = selectedContinent === 'all' || animal.continents.includes(selectedContinent);
            const matchesWeight = animal.max_weight <= maxWeight;

            // Karte anzeigen/verbergen
            if (matchesContinent && matchesWeight) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Event-Listener für den "Filter anwenden"-Button
    applyFiltersButton.on('click', applyFilters);

    // Versteckt den Sound-Button auf mobilen Geräten
    if (window.innerWidth <= 768) {
        $('#sound-toggle').hide();
        $('#filter-wrapper').hide();
    }
});


