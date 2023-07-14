import {EmployeeManagementSystemApplication} from "../../application";
import {Client, expect} from "@loopback/testlab";
import {setupApplication} from "./test-helper";


describe('DepartmentsController' , () => {
    let app : EmployeeManagementSystemApplication;
    let client: Client;

    before('setupApplication', async () => {
        ({app, client} = await  setupApplication());
    });
    after(async () => {
        await app.stop();
    });

    it('invokes GET /departments', async () => {
        const expectedResponse = [
            {
                "id": 1,
                "departmentName": "Software Development",
                "locationId": 1,
                "managerId": 2
            },
            {
                "id": 2,
                "departmentName": "Data Analysis",
                "locationId": 1,
                "managerId": 2
            },
            {
                "id": 3,
                "departmentName": "Product Management",
                "locationId": 1,
                "managerId": 2
            },
            {
                "id": 4,
                "departmentName": "Management",
                "locationId": 1,
                "managerId": 1
            }
        ];
        const res = await client.get('/departments').expect(200);
        expect(res.body).to.eql(expectedResponse);
    });

})

