const {test, expect} = require('@playwright/test')

//Login in -> verify user

test('First test', async ({ page }) => {

  //Login in
  await page.goto('https://maxscompany37.teamwork.com/');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('maxivina92@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Teamwork1234');
  await page.click('button[type=submit]');

  //Searching the avatar
  await page.getByRole('button', { name: 'Max vina' }).click();
  const userLogin = 'Max vina';
  const button = await page.waitForSelector('div[class="v-list-item-title !text-body-1 font-semibold !text-default"]');
  const text = await button.innerText();

  //Assersion
  expect(text).toBe(userLogin);
});