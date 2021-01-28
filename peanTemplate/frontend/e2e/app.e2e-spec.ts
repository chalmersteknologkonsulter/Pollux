import { OmniClaimPage } from './app.po';

describe('omni-claim App', () => {
  let page: OmniClaimPage;

  beforeEach(() => {
    page = new OmniClaimPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
