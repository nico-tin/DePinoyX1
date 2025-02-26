const betAmountInput = document.getElementById("betAmount");
const betButtons = document.querySelectorAll(".bet-btn");
const colorButtons = document.querySelectorAll(".color-btn");
const placeBetButton = document.getElementById("placeBet");
const cancelBetButton = document.getElementById("cancelBet");

let selectedBetCount = 0;
let selectedColors = [];

// ito yung para iupdate yung "Place Bet" button status
function updatePlaceBetButton() {
    placeBetButton.disabled = !(betAmountInput.value > 0 && selectedBetCount > 0 && selectedColors.length === selectedBetCount);
}

// una: enable bet selection after entering an amount
betAmountInput.addEventListener("input", function () {
    if (betAmountInput.value > 0) {
        betButtons.forEach(btn => btn.disabled = false);
    } else {
        resetSelections(); // reset lahat if the bet amount is removed
    }
    updatePlaceBetButton();
});

// sicend: select bet count and enable color buttons
betButtons.forEach(button => {
    button.addEventListener("click", function () {
        // alisin active class from all bet buttons
        betButtons.forEach(btn => btn.classList.remove("active"));

        // dagdag active class to the clicked button
        this.classList.add("active");

        // store yung number of colors the user can pick
        selectedBetCount = parseInt(this.getAttribute("data-count"));

        // enable color selection
        colorButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove("selected");
        });

        // ulit previous color selection
        selectedColors = [];

        updatePlaceBetButton();
    });
});

// allow selecting only the specified number of colors, nakadepende kung ilan
colorButtons.forEach(button => {
    button.addEventListener("click", function () {
        const color = this.getAttribute("data-color");

        if (selectedColors.includes(color)) {
            // Deselect if already selected
            selectedColors = selectedColors.filter(c => c !== color);
            this.classList.remove("selected");
        } else {
            if (selectedColors.length < selectedBetCount) {
                // Select new color
                selectedColors.push(color);
                this.classList.add("selected");
            }
        }

        updatePlaceBetButton();
    });
});

// cancel bet (ulit lahat)
function resetSelections() {
    betAmountInput.value = "";
    betButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("active");
    });
    colorButtons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove("selected");
    });
    placeBetButton.disabled = true;
    selectedColors = [];
    selectedBetCount = 0;
}

cancelBetButton.addEventListener("click", resetSelections);
