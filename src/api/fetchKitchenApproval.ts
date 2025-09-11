import {getKitchenUrl} from "./util/getUrl.ts";

export async function fetchKitchenApproval() {
  return mockKitchenApproval()
}

async function mockKitchenApproval() {
  return await new Promise<void>(resolve => setTimeout(resolve, 3000));
}