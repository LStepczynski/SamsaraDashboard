const fetch = require("node-fetch");

class Samsara {
  constructor(apiToken) {
    this.apiToken = apiToken;
  }

  async getAssetLocation() {
    const url = "https://api.samsara.com/v1/fleet/assets/locations";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching fuel: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      let sorted = {};

      data.assets.forEach((element) => {
        const loc = element.location[0].location;
        if (!Object.keys(sorted).includes(loc)) {
          sorted[loc] = [];
        }
        sorted[loc].push(element);
      });

      return sorted;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getHOSClocksBelow(rest, drive, shift, cycle) {
    const url = "https://api.samsara.com/fleet/hos/clocks";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching fuel: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      const below = data.data.filter((element) => {
        return (
          element.clocks.break.timeUntilBreakDurationMs <= rest ||
          element.clocks.drive.driveRemainingDurationMs <= drive ||
          element.clocks.shift.shiftRemainingDurationMs <= shift ||
          element.clocks.cycle.cycleRemainingDurationMs <= cycle
        );
      });
      return below;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getDriverById(id) {
    const url = `https://api.samsara.com/fleet/drivers/${id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching driver: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async fetchFuelBelow(percentage) {
    const url =
      "https://api.samsara.com/fleet/vehicles/stats?types=fuelPercents";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching fuel: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      // console.log(typeof data);

      const below = data.data.filter((element) => {
        return element.fuelPercent && element.fuelPercent.value <= percentage;
      });
      return below;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // Method to fetch all active vehicles
  async fetchActiveVehicles() {
    const url = "https://api.samsara.com/fleet/vehicles";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error fetching vehicles: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

module.exports = Samsara;
