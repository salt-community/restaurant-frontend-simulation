import {getKitchenUrl} from "./util/getUrl.ts";
import isMockedFetches from "@/api/util/isMockedFetches.ts";

export async function fetchInventory() {
  if (isMockedFetches()) {
    return mockInventory()
  } else {
    const url = getKitchenUrl() + "api/recipe/getAllRecipes"
    const response = await fetch(url)
    return response.json()
  }
}

function mockInventory() {
  return [
    {
      "id": 1,
      "name": "Classic Burger",
      "description": "A classic beef burger with fresh ingredients",
      "availableAmount": 0
    },
    {
      "id": 2,
      "name": "Pepperoni Pizza",
      "description": "Traditional pizza with pepperoni and cheese",
      "availableAmount": 1
    }
  ]
}