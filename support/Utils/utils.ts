import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";


// Fills an input field with the provided string
// and verifies that the entered value is correct.
export async function inputField(locator: Locator, str: string): Promise<void> {
    await locator.waitFor({ state: "visible", timeout: 30000 });
    await locator.click();
    await locator.clear();
    await locator.pressSequentially(str);

    // Verify that the input contains the expected value.
    await expect(locator).toHaveValue(str);
}


// Waits for an element to be visible and clicks it.
// If text is provided, it also verifies the element text.
export async function clickWebElement(
    locator: Locator,
    str?: string
): Promise<void> {
    await locator.waitFor({ state: "visible", timeout: 30000 });

    if (str) {
        await expect(locator).toHaveText(str);
    }

    await locator.click();
}


// Navigates to the given URL and waits for the DOM to load.
export async function goToPage(
    page: Page,
    url: string
): Promise<void> {
    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
}


// Verifies that an element is visible.
// If text is provided, it also verifies the expected text.
export async function visibilityOfElement(
    locator: Locator,
    text?: string
): Promise<void> {
    await expect(locator).toBeVisible({ timeout: 30000 });

    if (text) {
        const textValue = await locator.textContent();

        expect(textValue?.trim()).toContain(text);
    }
}


// Verifies that the current page URL contains the expected endpoint.
export async function assertPageUrl(
    page: Page,
    urlEndPoint: string
): Promise<void> {
    await expect(page).toHaveURL(new RegExp(urlEndPoint));
}


// Generates a random number between min and max (inclusive).
export function generateRandomNumber(
    max: number,
    min: number
): number {
    if (min > max) {
        throw new Error("Minimum value cannot be greater than maximum value.");
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Capitalizes the first character
// and converts the remaining characters to lowercase.
export function capitalize(str: string): string {
    if (!str) {
        return "";
    }

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


// Returns a formatted date using the current/upcoming month.
export function formatDateWithCurrentMonth(
    day: string,
    monthType: string = "",
    currentOrUpcomingMonth: number = 0
): string {
    const date = new Date();

    const monthNames: string[] = [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
    ];

    date.setMonth(date.getMonth() + currentOrUpcomingMonth);

    const month = monthNames[date.getMonth()];
    const updatedYear = date.getFullYear();

    const dayNumber = parseInt(day, 10);

    if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 31) {
        throw new Error("Invalid day. Day must be between 1 and 31.");
    }

    const formattedDay =
        dayNumber < 10 ? `0${dayNumber}` : `${dayNumber}`;

    let formattedMonth = month;

    if (monthType === "capitalize") {
        formattedMonth =
            month.charAt(0).toUpperCase() +
            month.slice(1).toLowerCase();
    }

    const space = monthType === "extraSpace" ? "  " : " ";

    return `${formattedDay}${space}${formattedMonth} ${updatedYear}`;
}


// Generates a random vehicle registration-style number.
export function generateVehicleNumber(): string {
    const stateCode = faker.string.alpha({
        length: 2,
        casing: "upper"
    });

    const rtoCode = faker.string.numeric(2);

    const series = faker.string.alpha({
        length: 2,
        casing: "upper"
    });

    const number = faker.string.numeric(4);

    return `${stateCode}${rtoCode}${series}${number}`;
}


// Generates a fake vehicle description.
export function generateVehicleDescription(): string {
    const manufacturer = faker.vehicle.manufacturer();
    const model = faker.vehicle.model();
    const type = faker.vehicle.type();
    const color = faker.color.human();
    const vin = faker.vehicle.vin();

    const year = faker.date
        .past({ years: 10 })
        .getFullYear();

    return `${color} ${year} ${manufacturer} ${model} (${type}) - VIN: ${vin}`;
}


// Cleans table data by removing empty lines
// and trimming unnecessary spaces.
export function formatTableData(
    rawData: string[]
): string[] {
    return rawData
        .join("")
        .split("\n")
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0);
}


// Waits for an API response matching the endpoint and status code.
export async function waitForApiAndStatus(
    page: Page,
    apiEndPoint: string,
    statusCode: number
): Promise<void> {
    await page.waitForResponse(
        response =>
            response.url().includes(apiEndPoint) &&
            response.status() === statusCode
    );
}


// Generates a random user-raised issue message.
export function generateUserRaisedNudge(): string {
    const issueType = faker.helpers.arrayElement([
        "blocked parking spot",
        "wrong vehicle detected",
        "QR code not working",
        "payment not processed",
        "gate access denied",
        "spot already occupied"
    ]);

    const followUp = faker.helpers.arrayElement([
        "Our team is looking into it.",
        "We've notified the support team.",
        "You'll hear back shortly.",
        "Thank you for your patience.",
        "We'll resolve this as soon as possible.",
        "Hang tight while we sort this out."
    ]);

    const politeStart = faker.helpers.arrayElement([
        "Thanks for reporting",
        "Issue received",
        "Got it",
        "Report noted",
        "We're on it"
    ]);

    return `${politeStart}! You reported a "${issueType}". ${followUp}`;
}


// Generates fake user data.
// If fields are provided, only those fields are returned.
// If no fields are provided, all fields are returned.
export function generateUserData(
    ...fields: string[]
): string[] {

    const allFields: Record<string, string> = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName(),
        email: faker.internet.email(),
        phoneNumber: faker.string.numeric(10),
        country: faker.location.country(),
        pincode: faker.location.zipCode("######"),
        company: faker.company.name(),
        website: faker.internet.url(),
        isCitizenOfIndia: faker.datatype.boolean()
            ? "Yes"
            : "No",
        locationName: faker.location.city(),
        locationAddress: faker.location.streetAddress(),
        description: faker.lorem.paragraph()
    };

    // Return all generated data when no field is specified.
    if (fields.length === 0) {
        return Object.values(allFields);
    }

    // Return only requested fields.
    return fields
        .filter(field => field in allFields)
        .map(field => allFields[field]);
}


// Creates a formatted date from a day number.
// Example: 5 -> 5th September
export function getFormattedDateFromInput(
    inputDateString: string
): string {

    const day = parseInt(inputDateString, 10);

    if (isNaN(day) || day < 1 || day > 31) {
        throw new Error(
            "Invalid day provided. Must be between 1 and 31."
        );
    }

    const today = new Date();

    const monthName = today.toLocaleString("default", {
        month: "long"
    });


    // Returns the correct ordinal suffix.
    const getOrdinalSuffix = (n: number): string => {
        if (n > 3 && n < 21) {
            return "th";
        }

        switch (n % 10) {
            case 1:
                return "st";

            case 2:
                return "nd";

            case 3:
                return "rd";

            default:
                return "th";
        }
    };

    return `${day}${getOrdinalSuffix(day)} ${monthName}`;
}


// Returns a random description from predefined values.
export function getRandomDescription(): string {
    const descriptions: string[] = [
        "A peaceful area with trees and benches for relaxation.",
        "An open field for sports, games, and outdoor fun.",
        "A natural zone with walking paths and native plants.",
        "A splash pad and fountain area for family water play.",
        "A fenced dog park with seating and shaded areas.",
        "A scenic trail for walking and cycling around the park.",
        "An event lawn used for concerts and community gatherings."
    ];

    return faker.helpers.arrayElement(descriptions);
}


// Returns a random internal note.
// The locator parameter is kept so existing test files
// using this function do not break.
export function fillRandomInternalNote(
    _locator: Locator
): string {

    const sampleNotes: string[] = [
        "Zone added for monthly staff parking.",
        "Temporary overflow zone - review in 30 days.",
        "EV chargers planned for this area.",
        "Created for visitor access only.",
        "Allocated for morning shift employees.",
        "Test zone for QA verification.",
        "High-demand area, monitor usage weekly.",
        "Accessible parking zone created.",
        "Requires signage update before launch.",
        "Backup zone during maintenance periods."
    ];

    return faker.helpers.arrayElement(sampleNotes);
}


// Verifies that an element is visible.
// Optionally verifies normalized text.
export async function visibilityOftext(
    locator: Locator,
    text?: string
): Promise<void> {

    await expect(locator).toBeVisible({
        timeout: 30000
    });

    if (text) {
        const textValue = await locator.textContent();

        const normalize = (str: string): string =>
            str.replace(/\s+/g, " ").trim();

        expect(
            normalize(textValue ?? "")
        ).toContain(normalize(text));
    }
}


// Selects a random option from a custom dropdown.
export async function selectRandomDropdownOption(
    page: Page,
    dropdownSelector: string,
    optionList: string[]
): Promise<string> {

    if (optionList.length === 0) {
        throw new Error("Option list cannot be empty.");
    }

    const randomOption =
        faker.helpers.arrayElement(optionList);

    await page
        .locator(dropdownSelector)
        .click();

    await page
        .getByRole("option", {
            name: randomOption
        })
        .click();

    return randomOption;
}


// Selects a random option from a native HTML select dropdown.
export async function selectRandomDropdown(
    page: Page,
    dropdownSelector: string,
    optionList: string[]
): Promise<string> {

    if (optionList.length === 0) {
        throw new Error("Option list cannot be empty.");
    }

    const randomOption =
        faker.helpers.arrayElement(optionList);

    await page
        .locator(dropdownSelector)
        .selectOption({
            label: randomOption
        });

    return randomOption;
}


// Selects a random option from a Select2 dropdown.
export async function selectRandomOptionFromSelect2Dropdown(
    page: Page,
    dropdownSelector: string
): Promise<string> {

    // Open the Select2 dropdown.
    await page
        .locator(dropdownSelector)
        .click();

    // Locate all available Select2 options.
    const optionsLocator =
        page.locator(".select2-results__option");

    // Wait until at least one option becomes visible.
    await optionsLocator
        .first()
        .waitFor({
            state: "visible",
            timeout: 5000
        });

    const optionCount =
        await optionsLocator.count();

    if (optionCount === 0) {
        throw new Error(
            "No options available in dropdown."
        );
    }

    // Select a random option.
    const randomIndex =
        Math.floor(Math.random() * optionCount);

    const randomOption =
        optionsLocator.nth(randomIndex);

    const optionText =
        await randomOption.textContent();

    // Click the selected option.
    await randomOption.click();

    return optionText?.trim() ?? "";
}


// Generates a CSV file containing fake user data.
export function generateFakeCSV(
    filePath: string,
    rowCount: number = 10
): void {

    if (rowCount < 0) {
        throw new Error(
            "Row count cannot be negative."
        );
    }

    const headers = [
        "First Name",
        "Last Name",
        "Email"
    ];

    const rows: string[] = [
        headers.join(",")
    ];

    for (let i = 0; i < rowCount; i++) {

        const firstName =
            faker.person.firstName();

        const lastName =
            faker.person.lastName();

        const email =
            faker.internet.email({
                firstName,
                lastName
            });

        rows.push(
            [firstName, lastName, email].join(",")
        );
    }

   
}


// Generates fake zone data for testing.
export function generateZoneData() {

    const name = faker.person.firstName();
    const name1 = faker.person.firstName();
    const company = faker.company.name();
    const email = faker.internet.email();
    const address1 = faker.location.streetAddress();
    const address2 = faker.location.streetAddress();
    const countryName = faker.location.country();
    const cityName = faker.location.city();
    const postalNum = faker.location.zipCode();
    const paragraph = faker.lorem.paragraph();

    return {
        name,
        name1,
        company,
        email,
        address1,
        address2,
        countryName,
        cityName,
        postalNum,
        paragraph
    };
}