import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WaterSystem from "../../component/service/search/water-system";
import Contact from "../../component/service/contact";
import MySearchBarScreen from "../../component/service/search/search-bar";
import Detail from "../../component/service/detail";
import ServiceContent from "../../component/service/service-content";
import TermOfService from "../../component/service/term-of-service";

const Service = createNativeStackNavigator();

export default function ServiceTab({ route }) {
  const { userInfo } = route.params;

  return (
    <Service.Navigator
      initialRouteName="ServiceContent"
      options={{ headerMode: "screen" }}
    >
      <Service.Screen
        name="ServiceContent"
        component={ServiceContent}
        initialParams={{ userInfo: userInfo }}
        options={{
          headerTitle: `สวัสดี, ${userInfo.given_name}`,
        }}
      />
      <Service.Screen
        name="ServiceDetail"
        component={Detail}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "รายละเอียด",
        }}
      />
      <Service.Screen
        name="Search"
        component={MySearchBarScreen}
        options={{
          headerBackTitleVisible: false,
          headerMode: "screen",
          headerTitle: "",
        }}
      />
      <Service.Screen
        name="WaterSystem"
        component={WaterSystem}
        options={{
          headerBackTitleVisible: false,
          headerMode: "screen",
          headerTitle: "",
        }}
      />
      <Service.Screen
        name="Contact"
        initialParams={{ userInfo: userInfo }}
        component={Contact}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "ข้อมูลติดต่อ",
        }}
      />
      <Service.Screen
        name="TermOfService"
        component={TermOfService}
        options={{
          headerBackTitleVisible: false,
          headerTitle: "TermOfService",
        }}
      />
    </Service.Navigator>
  );
}
