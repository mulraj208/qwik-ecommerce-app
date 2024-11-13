import {component$, useStore, useTask$} from '@builder.io/qwik';
import {AccountLinks, CompanyLinks, CustomerSupportLinks, LegalLinks} from "~/components/starter/footer/footer-link";
import {SocialIcons} from "~/components/starter/footer/footer-social-icons";
import {Subscribe} from "~/components/starter/footer/footer-subscribe";
import styles from "./footer.module.css";

export default component$(() => {
  const store = useStore({ isMobile: false });

  useTask$(() => {
    store.isMobile = typeof window !== 'undefined' ? window.innerWidth <= 1024 : false;
  });

  return (
      <footer class={`px-4 py-8 bg-gray-900 text-white ${styles.wrapper}`}>
        <div class="max-w-screen-xl mx-auto">
          <div class="hidden lg:grid grid-cols-4 gap-4 mb-6">
            <CustomerSupportLinks />
            <AccountLinks />
            <CompanyLinks />
            <Subscribe />
          </div>

          <div class="lg:hidden">
            <Subscribe />
            <SocialIcons />
          </div>

          <div class="hidden lg:flex justify-end">
            <SocialIcons />
          </div>

          {/* Legal Links */}
          <div class="mx-auto mt-6">
            <p class="text-sm text-gray-400 mb-6">
              <span>&copy;</span>
              {`${new Date().getFullYear()} Salesforce or its affiliates. All rights reserved. This is a demo store only. Orders made WILL NOT be processed.`}
            </p>

            <LegalLinks linkListVariant={store.isMobile ? 'vertical' : 'horizontal'} />
          </div>
        </div>
      </footer>
  );
});
