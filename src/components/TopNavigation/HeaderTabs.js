import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import PlusImage from '../../assets/images/plus-solid.svg'
import ContainerImage from '../../assets/images/box-open-solid.svg'
import InvoiceImage from '../../assets/images/receipt-solid.svg'
import ExpenseImage from '../../assets/images/sack-dollar-solid.svg'
import PaymentsImage from '../../assets/images/money-check-dollar-solid.svg'
import './HeaderTabs.css';
import CreateJob from "../Screens/CreateJob.js/CreateJob";
import ContainerStatus from "../Screens/ContainerStatus/ContainerStatus";
import ExpensesScreen from "../Screens/ExpensesScreen/ExpensesScreen";
import PaymentsScreen from "../Screens/PaymentsScreen/PaymentsScreen";
import InvoiceTemplate from "../Template/InvoiceTemplate/InvoiceTemplate";
import ContainedButton from "../ContainedButton/ContainedButton";

const HeaderTabs = ({isMobile = false}) => {

  const [value,setValue] = useState(1);

  const onTabChange = (event, newTabIndex) => {
    setValue(newTabIndex);
  };

  const PlusIcon = () => {
    return (
      <img src={PlusImage} height={"20"} width={"20"} />
    )
  }

  const ContainerIcon = () => {
    return (
      <img src={ContainerImage} height={"20"} width={"20"} />
    )
  }

  const InvoiceIcon = () => {
    return (
      <img src={InvoiceImage} height={"20"} width={"20"} />
    )
  }

  const ExpenseIcon = () => {
    return (
      <img src={ExpenseImage} height={"20"} width={"20"} />
    )
  }

  const PaymentsIcon = () => {
    return (
      <img src={PaymentsImage} height={"20"} width={"20"} />
    )
  }

  const onLogOut = () => {
    window.sessionStorage.removeItem('login_token');
    window.open(window.location.href,`_self`);
  }
  
    return (
      <React.Fragment>
        <div style={{position:'absolute',top:10,right:20,display:'flex',flexDirection:'column'}}>
        <ContainedButton label={'Logout'} handleClick={onLogOut} />
        <p>{`Login time : ${new Date()}`}</p>
        </div>
        <Tabs
  value={value}
  onChange={onTabChange}
  aria-label="icon position tabs example"
>
  <Tab icon={<PlusIcon />} iconPosition="end" label="Create a job" value={1} />
  <Tab icon={<ContainerIcon />} iconPosition="end" label="Container status" value={2} />
  <Tab icon={<InvoiceIcon />} iconPosition="end" label="Invoicing" value={3} />
  <Tab icon={<ExpenseIcon />} iconPosition="end" label="Expenses" value={4} />
  <Tab icon={<PaymentsIcon />} iconPosition="end" label="Payments" value={5} />
</Tabs>
    {value === 1 && <CreateJob isMobile={isMobile} />}
    {value === 2 && <ContainerStatus isMobile={isMobile} />}
    {value === 3 && <InvoiceTemplate isMobile={isMobile} />}
    {value === 4 && <ExpensesScreen isMobile={isMobile} />}
    {value === 5 && <PaymentsScreen isMobile={isMobile} />}
  </React.Fragment>

    )
}

export default HeaderTabs;