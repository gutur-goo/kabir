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
import AllJobs from "../Screens/AllJobs/AllJobs";
import InvoiceScreen from "../Screens/InvoiceScreen/InvoiceScreen";

const HeaderTabs = ({isMobile = false,isAdmin=false}) => {

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
        <div style={{position:'absolute',top:20,right:20,display:'flex',flexDirection:'column'}}>
        <ContainedButton label={'Logout'} handleClick={onLogOut} />
        {/* <p>{`Login time : ${new Date()}`}</p> */}
        </div>
        <div style={{backgroundColor:'orange'}}>
        <Tabs
  value={value}
  onChange={onTabChange}
  aria-label="icon position tabs example"
>
  <Tab icon={<ContainerIcon />} iconPosition="end" label="All Jobs" value={1} />
  <Tab icon={<PlusIcon />} iconPosition="end" label="Create a job" value={2} />
  <Tab icon={<ContainerIcon />} iconPosition="end" label="Container status" value={3} />
  {isAdmin && <Tab icon={<InvoiceIcon />} iconPosition="end" label="Invoicing" value={4} />}
  {isAdmin && <Tab icon={<ExpenseIcon />} iconPosition="end" label="Expenses" value={5} />}
  {isAdmin && <Tab icon={<PaymentsIcon />} iconPosition="end" label="Payments" value={6} />}
</Tabs>
</div>
    {value === 1 && <AllJobs isMobile={isMobile} />}
    {value === 2 && <CreateJob isMobile={isMobile} />}
    {value === 3 && <ContainerStatus isMobile={isMobile} />}
    {value === 4 && <InvoiceScreen isMobile={isMobile} />}
    {value === 5 && <ExpensesScreen isMobile={isMobile} />}
    {value === 6 && <PaymentsScreen isMobile={isMobile} />}
    
  </React.Fragment>

    )
}

export default HeaderTabs;