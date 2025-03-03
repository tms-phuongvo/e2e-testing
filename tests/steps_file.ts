/// <reference types="codeceptjs" />

type ISteps = {
  login(email: string, password: string): Promise<void>;
};

export = (): ISteps => ({
  login: async function (email, password) {
    await this.amOnPage("/login");
    await this.fillField('input[name="email"]', email);
    await this.fillField('input[name="password"]', password);
    await this.click('button[type="submit"]');
  }
});
