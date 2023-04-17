const {test, expect} = require('@playwright/test')

//Creating a milestone

test('Third test', async ({ page }) => {

    //Login in
    await page.goto('https://maxscompany37.teamwork.com/');
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('maxivina92@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('Teamwork1234');
    await page.click('button[type=submit]');

    //Select the project
    const iframe = await page.frameLocator('iframe');
    await page.getByRole('tab', { name: 'My projects' }).click();
    await iframe.getByRole('link', { name: 'Test One' }).first().click();

    //Select milestones
    const getMilestones = await page.$$eval('a', links => links.find(link => link.getAttribute('href') === '/app/projects/903798/milestones'));
    
    //(in here i'm using a waiting time because I can't make it work in headless without this time, I'm sure there is a bwtter way :D)
    await page.waitForTimeout(5000);
    
    if (getMilestones) {
        await getMilestones.click()
    } else {
        await page.getByRole('tab', { name: 'More...' }).click();
        await page.click('a[href="/app/projects/903798/milestones"]')
    }

    //Add milestone button
    await iframe.getByRole('button', { name: 'Add Milestone' }).click();

    //Creating the milestone
    await iframe.locator('#milestoneName').click();
    const randomText = 'Random text + ' + Math.floor(Math.random() * 25);
    await iframe.locator('#milestoneName').fill(randomText);

    //Submiting the milestone
    const addMilestoneSubmitButton = await iframe.locator('button[type="submit"]', { text: 'Add Milestone' }).first();
    await addMilestoneSubmitButton.click();

    //Assersion
    const response = await page.goto('https://maxscompany37.teamwork.com/projects/903798/milestones.json');
    expect(response.status()).toBe(200);
  });