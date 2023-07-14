import {Client, expect} from '@loopback/testlab';
import {EmployeeManagementSystemApplication} from '../..';
import {setupApplication} from './test-helper';

describe('EmployeesController', () => {
  let app: EmployeeManagementSystemApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /employees', async () => {
    const expectedResponse = [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "phone": "+1-555-123-4567",
        "hireDate": "2023-07-12",
        "departmentId": 4,
        "titleId": 11,
        "managerId": 1
      },
      {
        "id": 2,
        "firstName": "Adam",
        "lastName": "Black",
        "email": "adamblack@example.com",
        "phone": "+1-555-987-6543",
        "hireDate": "2022-11-28",
        "departmentId": 4,
        "titleId": 10,
        "managerId": 1
      },
      {
        "id": 3,
        "firstName": "Michael",
        "lastName": "Johnson",
        "email": "michaeljohnson@example.com",
        "phone": "+1-555-567-8901",
        "hireDate": "2023-02-15",
        "departmentId": 1,
        "titleId": 4,
        "managerId": 2
      },
      {
        "id": 4,
        "firstName": "Emily",
        "lastName": "Davis",
        "email": "emilydavis@example.com",
        "phone": "+1-555-234-5678",
        "hireDate": "2023-06-02",
        "departmentId": 3,
        "titleId": 3,
        "managerId": 2
      },
      {
        "id": 5,
        "firstName": "David",
        "lastName": "Wilson",
        "email": "davidwilson@example.com",
        "phone": "+1-555-678-9012",
        "hireDate": "2023-03-17",
        "departmentId": 2,
        "titleId": 2,
        "managerId": 2
      },
      {
        "id": 6,
        "firstName": "Emma",
        "lastName": "Johnson",
        "email": "emmajohnson@example.com",
        "phone": "+1-555-234-5678",
        "hireDate": "2022-11-15",
        "departmentId": 1,
        "titleId": 1,
        "managerId": 2
      },
      {
        "id": 7,
        "firstName": "Michael",
        "lastName": "Smith",
        "email": "michaelsmith@example.com",
        "phone": "+1-555-345-6789",
        "hireDate": "2023-01-20",
        "departmentId": 3,
        "titleId": 3,
        "managerId": 2
      },
      {
        "id": 8,
        "firstName": "Sophia",
        "lastName": "Brown",
        "email": "sophiabrown@example.com",
        "phone": "+1-555-456-7890",
        "hireDate": "2023-03-05",
        "departmentId": 2,
        "titleId": 2,
        "managerId": 2
      },
      {
        "id": 9,
        "firstName": "Oliver",
        "lastName": "Wilson",
        "email": "oliverwilson@example.com",
        "phone": "+1-555-567-8901",
        "hireDate": "2023-05-10",
        "departmentId": 1,
        "titleId": 4,
        "managerId": 2
      },
      {
        "id": 10,
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "janesmith@example.com",
        "phone": "+1-555-987-6543",
        "hireDate": "2023-07-15",
        "departmentId": 4,
        "titleId": 11,
        "managerId": 1
      },
      {
        "id": 11,
        "firstName": "Anne",
        "lastName": "Smith",
        "email": "annees@example.com",
        "phone": "+1-554-987-6543",
        "hireDate": "2023-07-15",
        "departmentId": 1,
        "titleId": 1,
        "managerId": 2
      }
    ];
    const res = await client.get('/employees').expect(200);
    expect(res.body).to.deepEqual(expectedResponse);
  });

  it('invokes POST /employees', async () => {
    const newEmployee = {
      firstName: "Emily",
      lastName: "Johnson",
      email: "emilyjohnson@example.com",
      phone: "+1-555-123-4567",
      hireDate: "2023-07-12",
      departmentId: 2,
      titleId: 5,
      managerId: 3
    }
    const res = await client.post('/employees').send(newEmployee).expect(200);

    if(res.body){
      const {id} = res.body;
      // delete the new data added to database
      await client.delete(`/employees/${id}`).expect(204);
      console.log(`Employee with ID ${id} is deleted.`);
    }
  });
});
