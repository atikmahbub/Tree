import React, { useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import CompanyData from '../assets/JsonData/companies.json';
import '../assets/css/home.css'
import EmployeeData from '../assets/JsonData/employees.json'
import {AiTwotoneHome} from 'react-icons/ai'
import {GoLocation, GoProject} from 'react-icons/go'
import {BsPeople} from 'react-icons/bs'
import {RiFileInfoLine} from 'react-icons/ri'
import {BsFillPentagonFill} from 'react-icons/bs'
import Modal from 'react-modal';
import CompanyAddress from '../assets/JsonData/company-addresses.json'
import ProjectData from '../assets/JsonData/projects.json'

function Home() {
  const pageLimit = 5;
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [companyData, setCompanyData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [employees , setEmployees] = useState([])
  const [caddress , setCAdrress] = useState([])
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const [modalIsOpen1,setIsOpen1] = React.useState(false);
  const [modalIsOpen2,setIsOpen2] = React.useState(false);
  const [projectData , setProjectData] = useState([])
  const[modalContent , setModalContent] = useState([])
  const[modalContent1 , setModalContent1] = useState([])
  const[modalContent2 , setModalContent2] = useState([])
  const[projects , setProjects] = useState([])
  const[participate , setParticipate] = useState([])
  var prArray = []
  const openModal = (id , name , indicator) =>{
      setIsOpen(true);
      caddress.filter(cadd =>cadd.companyId === id).map(cdd=>{
          setModalContent({
              city : cdd.city,
              country: cdd.country,
              street: cdd.street,
              state: cdd.state,
              name : name,
          })
      })
      let projectArray = projectData.filter(cpp => cpp.companyId === id)
      setProjects(projectArray)
    }

    const openModal1 = (id) =>{
        setIsOpen1(true)
        var newState = {};
        employees.filter(emp =>emp.id === id).map(emp=>{
            setModalContent1({
                name : emp.firstName + " " + emp.lastName,
                jobArea: emp.jobArea,
                jobType: emp.jobType,
                birth: emp.dateOfBirth,
            })
        })
        
        for( var i=0 ; i < projectData.length ; i++){
            for(var j = 0 ; j < projectData[i].employeesId.length ; j++){
                if(id === projectData[i].employeesId[j]){
                  prArray.push(projectData[i].name)
                  newState["name"] = prArray
                }
                else{
                    continue
                }
            }  
        }  
        
        setParticipate(newState)
    }

    const openModal2 = (job , id , id1) =>{
      console.log(id)
      setIsOpen2(true)
      let totalNumber = employees.filter(e=> e.companyId === id && e.jobArea == job ).length
      setModalContent2({
        number : totalNumber
      })
    }
   
  function closeModal(){
    setIsOpen(false);
  }

  function closeModal1(){
    setIsOpen1(false);
  }

  function closeModal2(){
    setIsOpen2(false);
  }
  useEffect(() => {
      setCompanyData(CompanyData)
      setEmployees(EmployeeData)
      setCAdrress(CompanyAddress)
      setProjectData(ProjectData)
  }, []);
  useEffect(() => {
    setCurrentData(companyData.slice(offset, offset + pageLimit));
  }, [offset, companyData]);

const processedEmployeeArray = employees.reduce(function(previous, current) {
        var object = previous.filter(object =>object.companyId === current.companyId && object.jobArea === current.jobArea);
        if (object.length == 0) {
        previous.push(current);
        }
        return previous;
    }, []);

  return (
    <div>
      <div className="company-card-container">
        {currentData.map((data) => (
          <div className="company-card">
              <div className="company-name-div">
              <AiTwotoneHome style={{fontSize :"32px" , color : "tomato"}}/>
              <h3 onClick={() => openModal(data.id , data.name , "company")}> {data.name}</h3>
              </div>
              <div>
                  <div className="area-name-div">
                      <GoLocation style={{fontSize :"30px" , color : "tomato"}}/>
                      <div className="area-text">Employee Job Area</div>
                  </div>
                  
                  <div className="job-area-content">
              {
                  processedEmployeeArray.filter((emp) =>  emp.companyId === data.id).map((empl)=>
                    (
                      <div className="job-area-content-item" onClick={()=> openModal2(empl.jobArea , data.id , empl.id)}>{empl.jobArea}</div>
                  ))
              }
              </div>
              </div>
              <div>
            <div className="area-name-div">
                      <BsPeople style={{fontSize :"30px" , color : "tomato"}}/>
                      <div className="area-text">Employee Name</div>
            </div>
            <div className="employee-area">
              {
                  employees.filter((emp) =>  emp.companyId === data.id).map((empl , i)=>
                    (

                        
                      <div className="employee-name" onClick={()=>openModal1(empl.id )}>{empl.firstName + " " + empl.lastName}</div>
                  ))
              }
              </div>
              </div>
        </div>
        ))}
      </div>
      <Paginator
        totalRecords={companyData.length}
        pageLimit={pageLimit}
        pageNeighbours={2}
        setOffset={setOffset}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
    >
        <div>
            <div>
            <div className="company-name-div">
              <AiTwotoneHome style={{fontSize :"32px" , color : "tomato"}}/>
              <h3>{modalContent.name}</h3>
            </div>
            <div className="area-name-modal">
                      <GoLocation style={{fontSize :"30px" , color : "tomato" , marginRight : "5px"}}/>
                        <div>{modalContent.city }, {modalContent.street}, {modalContent.state}, {modalContent.country}</div>
            </div>

            <div>
                <div className="project-text-div">
                    <GoProject style={{fontSize: "30px" , color: "tomato"}}/>
                    <h3>Projects</h3>
                </div>

                <div className="project-item-container">
                {projects.map(cpp=>(
                    <div className=" employee-name">{cpp.name}</div>
                ))}
                </div>
            </div>

            </div>
        </div>
    </Modal>
    <Modal
          isOpen={modalIsOpen1}
          onRequestClose={closeModal1}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
    >
        <div>
        <div className="project-text-div">
                    <RiFileInfoLine style={{fontSize: "30px" , color: "tomato"}}/>
                    <h3>Employee Information</h3>
        </div>
        <div className="employee-item-info">
                <div>Name : {modalContent1.name }</div>
                <div>Job Area : {modalContent1.jobArea }</div>
                <div>Job Type : {modalContent1.jobType }</div>
                <div>Birth Date : {modalContent1.birth }</div>
        </div>

        <div className="participation">
        <div className="project-text-div">
                    <BsFillPentagonFill style={{fontSize: "30px" , color: "tomato"}}/>
                    <h3>Part Of Projects</h3>
        </div>
        <div className="project-item-container">
            { participate.name && participate.name.map(item =>(<div className="pr-pill">{item}</div>))}
        </div>
        </div>
        </div>
    </Modal>
    <Modal
          isOpen={modalIsOpen2}
          onRequestClose={closeModal2}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
    >

      <div className="job-number">
        <h1>{modalContent2.number}</h1> people working
      </div>
      </Modal>
    </div>
  );
}
 
export default Home;