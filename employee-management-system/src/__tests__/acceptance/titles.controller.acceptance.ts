import {EmployeeManagementSystemApplication} from "../../application";
import {Client, expect} from "@loopback/testlab";
import {setupApplication} from "./test-helper";

describe('TitlesController',() => {
    let app : EmployeeManagementSystemApplication;
    let client : Client;

    before( 'setupApplication',async () => {
        ({app, client}= await setupApplication());
    });

    after(async () => {
       await app.stop();
    });

    it('invokes GET /titles', async () =>{
        const  expectedResponse = [
            {
                "id": 1,
                "titleName": "Software Engineer",
                "salary": 80000,
                "responsibilities": "Developing and maintaining software applications"
            },
            {
                "id": 2,
                "titleName": "Data Analyst",
                "salary": 70000,
                "responsibilities": "Analyzing and interpreting complex data sets"
            },
            {
                "id": 3,
                "titleName": "Product Manager",
                "salary": 90000,
                "responsibilities": "Defining and managing product roadmap"
            },
            {
                "id": 4,
                "titleName": "Lead Software Engineer",
                "salary": 90000,
                "responsibilities": "Leading and guiding software development teams, designing software architectures"
            },
            {
                "id": 5,
                "titleName": "Software Architect",
                "salary": 100000,
                "responsibilities": "Designing software architectures, overseeing technical solutions"
            },
            {
                "id": 6,
                "titleName": "Product Strategy Director",
                "salary": 110000,
                "responsibilities": "Developing and executing product strategies, driving product roadmap"
            },
            {
                "id": 7,
                "titleName": "Chief Product Officer",
                "salary": 120000,
                "responsibilities": "Leading product vision and strategy, overseeing product management"
            },
            {
                "id": 8,
                "titleName": "Data Science Specialist",
                "salary": 95000,
                "responsibilities": "Applying data science techniques, analyzing complex datasets"
            },
            {
                "id": 9,
                "titleName": "Data Analytics Manager",
                "salary": 105000,
                "responsibilities": "Leading data analytics team, driving data-driven insights"
            },
            {
                "id": 10,
                "titleName": "Top Management Executive",
                "salary": 120000,
                "responsibilities": "Setting strategic goals, overseeing operations, leading top-level decision-making"
            },
            {
                "id": 11,
                "titleName": "Executive Vice President",
                "salary": 200000,
                "responsibilities": "Overseeing company operations, setting strategic direction, managing executive team"
            }
        ];
        const res = await client.get('/titles').expect(200);
        expect(res.body).to.eql(expectedResponse);
    });
})