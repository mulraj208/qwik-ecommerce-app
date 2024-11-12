import {component$, Resource, useResource$} from "@builder.io/qwik";
import {QwikLogo} from "../icons/qwik";
import styles from "./header.module.css";
import {getApiClients} from "~/utils/commerce-api";
import {CAT_MENU_DEFAULT_NAV_SSR_DEPTH, CAT_MENU_DEFAULT_ROOT_CATEGORY} from "~/constants";

export interface levelZeroCategoriesQuery {
  categories: Array<CommerceSDK.Category>
}

export default component$(() => {
  const apiResource = useResource$(async () => {
    const {shopperProducts} = await getApiClients();
    const levelZeroCategoriesQuery =  await shopperProducts.getCategory({
      parameters: {id: CAT_MENU_DEFAULT_ROOT_CATEGORY, levels: CAT_MENU_DEFAULT_NAV_SSR_DEPTH}
    }) as unknown as levelZeroCategoriesQuery;

    console.log(levelZeroCategoriesQuery);

    return levelZeroCategoriesQuery;
  });

  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <QwikLogo height={50} width={143} />
          </a>
        </div>
        <ul>
          <li>
            <a
              href="https://qwik.dev/docs/components/overview/"
              target="_blank"
            >
              Docs
            </a>
          </li>
          <li>
            <a
              href="https://qwik.dev/examples/introduction/hello-world/"
              target="_blank"
            >
              Examples
            </a>
          </li>
          <li>
            <a
              href="https://qwik.dev/tutorial/welcome/overview/"
              target="_blank"
            >
              Tutorials
            </a>
          </li>
        </ul>
      </div>

      <Resource
          value={apiResource}
          onPending={() => <p>Loading...</p>}
          onResolved={(data) => (
              <ul>
                {JSON.stringify(data)}
              </ul>
          )}
          onRejected={(error) => <p>Error: {error.message}</p>}
      />
    </header>
  );
});
