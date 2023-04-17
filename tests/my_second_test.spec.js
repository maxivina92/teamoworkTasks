const {test, expect} = require('@playwright/test')

//Creating a task

test('Second test', async ({ page }) => {

    //Login in
    await page.goto('https://maxscompany37.teamwork.com/');
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('maxivina92@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Teamwork1234');
    await page.click('button[type=submit]');

    //Select the project
    await page.getByRole('tab', { name: 'My projects' }).click();
    const iframe = await page.frameLocator('iframe');
    await iframe.getByRole('link', { name: 'Test One' }).click();

    //Add a task
    await iframe.getByRole('button', { name: 'Add a task' }).click();
    const randomText = "hasToWork " + Math.floor(Math.random() * 10011);
    await iframe.getByPlaceholder('What needs to be done?').fill(randomText);
    await iframe.getByRole('button', { name: 'Create Task' }).click();

    //Assersion
    const response = await page.goto('https://maxscompany37.teamwork.com/tasklists/2780492/tasks.json');
    expect(response.status()).toBe(200);
});