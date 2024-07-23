const apiKey = 'hd1Ls04KD74xJzX4MXKRvQJRVYYqsZ9E';
const apiUrl = 'https://calendarific.com/api/v2';

document.getElementById('fetchHolidays').addEventListener('click', fetchHolidays);

/**
 * Fetch holidays from the Calendarific API and display them on the webpage.
 */
function fetchHolidays() {
    const country = document.getElementById('country').value;
    const year = document.getElementById('year').value;
    const holidaysContainer = document.getElementById('holidays');
    const loadingIndicator = document.getElementById('loading');

    holidaysContainer.innerHTML = '';
    loadingIndicator.style.display = 'block';

    fetch(`${apiUrl}/holidays?api_key=${apiKey}&country=${country}&year=${year}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loadingIndicator.style.display = 'none';
            displayHolidays(data.response.holidays);
        })
        .catch(error => {
            loadingIndicator.style.display = 'none';
            console.error('There was a problem with the fetch operation:', error);
            holidaysContainer.innerHTML = '<p class="text-danger">Failed to load holidays. Please try again later.</p>';
        });
}

/**
 * Display the holidays on the webpage.
 * @param {Array} holidays - List of holiday objects.
 */
function displayHolidays(holidays) {
    const holidaysContainer = document.getElementById('holidays');
    holidaysContainer.innerHTML = '';

    holidays.forEach(holiday => {
        const holidayElement = document.createElement('div');
        holidayElement.className = 'holiday';
        holidayElement.innerHTML = `
            <h5>${holiday.name}</h5>
            <p>${holiday.date.iso}</p>
            <p>${holiday.description}</p>
        `;
        holidaysContainer.appendChild(holidayElement);
    });
}
