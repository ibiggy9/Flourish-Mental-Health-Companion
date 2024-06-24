import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';

const APIKeys = {
  apple: 'appl_qtsGzWhuxYbwkXHjjmDQFBfidAS',
  google: 'goog_CeNURIuzEJvPZOcGzpTtcayDDnP',
};

const membershipTypes = {
  appleMonthly:'proMonthly',
  appleAnnually:'proYearly',
  androidMonthly:"pro_monthly_android",
  androidAnnually:"pro_annual_android",
  
}

function useRevHook() {
  
  const [currentOffering, setCurrentOffering] = useState(PurchasesOffering);
  const [customerInfo, setCustomerInfo] = useState(CustomerInfo);
  const isProMember = customerInfo?.entitlements.active.pro

  /*
    customerInfo?.activeSubscriptions.includes(membershipTypes.appleMonthly) ||
    customerInfo?.activeSubscriptions.includes(membershipTypes.appleAnnually) ||
    customerInfo?.activeSubscriptions.includes(membershipTypes.androidMonthly) ||
    customerInfo?.activeSubscriptions.includes(membershipTypes.androidAnnually) 
  */
  

  useEffect(() => {
    const fetchData = async () => {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
      
      if(Platform.OS == 'ios'){  
        await Purchases.configure({ apiKey: APIKeys.apple });
      } else {
        await Purchases.configure({apiKey: APIKeys.google})
      }

      // From revCat
      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();
      
      setCustomerInfo(customerInfo);
      setCurrentOffering(offerings.current);

    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo) => {
      setCustomerInfo(purchaserInfo);
    };
    
    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return { currentOffering, customerInfo, isProMember};
}

export default useRevHook;
