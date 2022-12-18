import { getRootParentLink } from "../helpers";
import { LinkI } from "../interface";

describe("helpers", () => {
  it("getRootParentLink", () => {
    const trueResult: LinkI = {
      to: "/admin/articles",
      text: "Статьи на сайте",
      parent: null,
    };
    const result = getRootParentLink({
      activeLink: {
        to: "/admin/articles/edit",
        text: "",
        parent: "/admin/articles",
      },
    });

    expect(JSON.stringify(result)).toBe(JSON.stringify(trueResult));
  });
});
