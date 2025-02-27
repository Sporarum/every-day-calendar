//import EveryDayCalendar from "./main";
import { calculateDates } from "./dateCalculations";

describe('EveryDayCalendar Tests', () => {
    test("should be importable", () => {
        expect(calculateDates).toBeTruthy();
    });

    test("calculateDates is called as many times as there are days (non-leap year)", () => {
        const mockFromDays = jest.fn()
        calculateDates(2025, mockFromDays)
        expect(mockFromDays).toHaveBeenCalledTimes(365);
    });

    test("calculateDates is called as many times as there are days (leap year)", () => {
        const mockFromDays = jest.fn()
        calculateDates(2024, mockFromDays)
        expect(mockFromDays).toHaveBeenCalledTimes(366);
    });

    test("calculateDates returns the correct month names", () => {
        const mockFromDays = jest.fn()
        const months = calculateDates(2025, mockFromDays)
        const monthNames = months.map(m => m.name)
        expect(monthNames).toStrictEqual(["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"])
    });
});
