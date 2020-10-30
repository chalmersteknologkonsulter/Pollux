// @flow

export type ArticleType = {
  _id: string,
  lead_paragraph: string,
  headline: {
    main: string
  },
  multimedia: {
    url: string
  }[]
};
