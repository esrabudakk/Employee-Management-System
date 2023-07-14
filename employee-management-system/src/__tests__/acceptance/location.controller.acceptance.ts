import { Client, expect } from "@loopback/testlab";
import { EmployeeManagementSystemApplication } from "../../application";
import { setupApplication } from "./test-helper";


describe('LocationsController', () => {
    let app: EmployeeManagementSystemApplication;
    let client: Client;

    before('setupApplication', async () => {
        ({ app, client } = await setupApplication());
    });

    after(async () => {
        await app.stop();
    });

    it('invokes GET /locations', async () => {
        const expectedResponse = { locationName: 'ABC Technology' };
        const res = await client.get('/locations').expect(200);
        const resFind = res.body.find((item: {locationName: string}) => item.locationName === expectedResponse.locationName);
        
        expect(resFind).to.containEql(expectedResponse);
    });
})