/*
*Create Employee Transaction
*@param {org.accredilink.screening.employee.createEmployee} employeeData
*@transaction
*
*/
function createEmployee(employeeData){
    return getAssetRegistry('org.accredilink.screening.employee.Employee')
        .then(async function(employeeRegistry){
          //namespace call
          var NS = 'org.accredilink.screening.employee';
          //setting the ID
          var employeeID = generateEmployeeId(employeeData.SSN,employeeData.dob); 
          var employee = getFactory().newResource(NS,'Employee', employeeID);
  
          //setting concepts and enums
          var information = getFactory().newConcept(NS, "PersonalInfo");
  
          //set data in concepts and enum with unused types
          employee.lName = employeeData.lName;
          information.fName = employeeData.fName;
          information.mName = employeeData.mName;
          information.alias = [];
          information.dob = employeeData.dob;
          information.address = employeeData.address;
          information.SSN = employeeData.SSN;
          information.email = employeeData.email;
          information.phone = employeeData.phone;
  
          employee.information = information;
          //generate event
          var event = getFactory().newEvent(NS, 'employeeCreated');
          event.employeeID = employeeID;
          emit(event);
          //add to registry
          return employeeRegistry.add(employee);
      });
}
/*
*Add Alias Transaction
*@param {org.accredilink.screening.employee.addAlias} aliasData
*@transaction
*
*/
function addAlias(aliasData){
    return getAssetRegistry('org.accredilink.screening.employee.Employee')
          .then(async function(employeeRegistry){
              //namespace call
                var NS = 'org.accredilink.screening.employee';
              //concepts
              var information = getFactory().newConcept(NS, "PersonalInfo");
        if(employeeRegistry.exists(aliasData.employeeID)){
            const employee = await employeeRegistry.get(aliasData.employeeID);
            employee.information.alias.push(aliasData.alias);
          
            var event = getFactory().newEvent(NS, 'addedAlias');
            event.employeeID = aliasData.employeeID;
            emit(event);
            //add to registry
            return employeeRegistry.update(employee);
         }
        else{
            throw new Error('employee does not exist'); 
      }
    });
  }
/*
*Add Address Transaction
*@param {org.accredilink.screening.employee.addAddress} addressData
*@transaction
*
*/
function addAddress(addressData){
    return getAssetRegistry('org.accredilink.screening.employee.Employee')
          .then(async function(employeeRegistry){
              //namespace call
                var NS = 'org.accredilink.screening.employee';
              //concepts
              var information = getFactory().newConcept(NS, "PersonalInfo");
      if(employeeRegistry.exists(addressData.employeeID)){
            const employee = await employeeRegistry.get(addressData.employeeID);
            employee.information.address = addressData.address;
          
            var event = getFactory().newEvent(NS, 'addedAddress');
            event.employeeID = addressData.employeeID;
            emit(event);
            //add to registry
            return employeeRegistry.update(employee);
      }
      else{
           throw new Error('employee does not exist'); 
      }
    });
  }
/*
*add offenseType Transaction
*@param {org.accredilink.screening.employee.addOffenseType} offenseData
*@transaction
*
*/
function addOffenseType(offenseData){
    return getAssetRegistry('org.accredilink.screening.employee.Employee')
          .then(async function(employeeRegistry){
              //namespace call
                var NS = 'org.accredilink.screening.employee';
            
        if(employeeRegistry.exists(offenseData.employeeID)){
            const employee = await employeeRegistry.get(offenseData.employeeID);
            employee.offenseType = offenseData.offenseType;
            employee.status = 'RED';

            var event = getFactory().newEvent(NS, 'addedOffenseType');
            event.employeeID = offenseData.employeeID;
            emit(event);
            //add to registry
            return employeeRegistry.update(employee);
        }
        else{
           throw new Error('employee does not exist'); 
        }
    });
  }
/*
*add pendingOffense Transaction
*@param {org.accredilink.screening.employee.addPendingOffense} pendingOffenseData
*@transaction
*
*/
function addPendingOffense(pendingOffenseData){
    return getAssetRegistry('org.accredilink.screening.employee.Employee')
          .then(async function(employeeRegistry){
              //namespace call
                var NS = 'org.accredilink.screening.employee';
              //concepts
              var information = getFactory().newConcept(NS, "PersonalInfo");
        if(employeeRegistry.exists(pendingOffenseData.employeeID)){
            const employee = await employeeRegistry.get(pendingOffenseData.employeeID);
            employee.pendingOffense = pendingOffenseData.pendingOffense;
            if(employee.status != 'RED'){
                employee.status = 'YELLOW';
            }
            var event = getFactory().newEvent(NS, 'addedPendingOffense');
            event.employeeID = pendingOffenseData.employeeID;
            emit(event);
            //add to registry
            return employeeRegistry.update(employee);
        }
        else{
            throw new Error('employee does not exist'); 
        }
    });
  }
/*
*add contact Transaction
*@param {org.accredilink.screening.employee.addContact} contactData
*@transaction
*
*/
function addContact(contactData){
    return getAssetRegistry('org.accredilink.screening.employee.Employee')
          .then(async function(employeeRegistry){
              //namespace call
                var NS = 'org.accredilink.screening.employee';
              //concepts
              var information = getFactory().newConcept(NS, "PersonalInfo");
        if(employeeRegistry.exists(contactData.employeeID)){
            const employee = await employeeRegistry.get(contactData.employeeID);
            employee.information.email = contactData.email;
            employee.information.phone = contactData.phone;

            var event = getFactory().newEvent(NS, 'addedContact');
            event.employeeID = contactData.employeeID;
            emit(event);
            //add to registry
            return employeeRegistry.update(employee);
        }
        else{
            throw new Error('employee does not exist'); 
        }
    });
  }
//employee ID generator
function generateEmployeeId(SSN,dob){
    var dt = new Date(dob);

    var month = dt.getMonth()+1
    if((month+'').length == 1) month = '0'+month;
    var day = dt.getDate();
    if((day+'').length == 1) day = '0'+day;
    return SSN + month + day + (dt.getFullYear()+'').substring(2,4);
}