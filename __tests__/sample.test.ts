import "./test-helpers/cycle";
import puppeteer from "puppeteer";

declare global {
    interface JSON {
        decycle: (
            object: { [name: string]: any },
            replacer?: (key: string, value?: any) => any
        ) => string | null;
    }
}

describe("Given that I go to the main page", () => {
    let browser: puppeteer.Browser;
    let page: puppeteer.Page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:8080/");
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Then is should have the title "vue-3-jsx-test"', async () => {
        const title = await page.title();
        expect(title).toMatch("vue-3-jsx-test");
    });

    describe("when I click on a topic", () => {
        test("Then it should change the main content", async () => {
            const topicSelector = ".demo-topics-list-item";
            const mainContentSelector = ".demo-main div";
            const topic = await page.$(topicSelector);
            //console.log(JSON.stringify(JSON.decycle({ topic })));
            const expectedText = await page.$eval(
                topicSelector,
                (el) => el.textContent
            );

            if (!topic) {
                throw new Error("cannot find topic");
            }

            await topic.click();
            const mainContentText = await page.$eval(
                mainContentSelector,
                (el: { textContent: any }) => el.textContent
            );
            expect(mainContentText).toContain(expectedText);
        });
    });
});

export default {};
