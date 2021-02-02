//Let's go baby

let sizeNum = 0;
let speedNum = 0;
let systemNum = 0;
let costNum = 5;
let durabilityNum = 3;
let environmentsList = ['space'];
let pointNum = 10;
let customNum = 0;
let customsList = [];

const size = document.getElementById("size");
const speed = document.getElementById("speed");
const system = document.getElementById("system");
const cost = document.getElementById("cost");
const durability = document.getElementById("durability");
const environments = document.getElementById("environments");
const shipPoints = document.getElementById("points");
const customizations = document.getElementById("customizations");
const customizations2 = document.getElementById("customsList");

size.textContent = sizeNum;
speed.textContent = speedNum;
system.textContent = systemNum;
cost.textContent = costNum;
durability.textContent = durabilityNum;
environments.textContent = environmentsList;
shipPoints.textContent = pointNum;
customizations.textContent = customNum;
customizations2.textContent = customsList;

const originalPN = pointNum;
let costSub = 0;
let durAdd = 0;
let crewNum = 0;

const originalCost = costNum;
let costCostSub = 0;
let durCostAdd = 0;
let costlyCustomNum = 0;
let shuttleNum = 0;

function Crewmembers() {
    var input = parseInt(document.getElementById("crewNum").value);
    crewNum = input;
    SPCalc();
}

function SizeBTN() {
    var stat = parseInt(document.getElementById("sizebtn").value);
    sizeNum = stat;
    size.textContent = sizeNum;
    CostCalc();
    SPCalc();
}

function SpeedBTN() {
    SpeedCalc();
    CostCalc();
    SPCalc();
}

function SystemBTN() {
    var stat = parseInt(document.getElementById("systembtn").value);
    SystemCalc();
    CostCalc();
    SPCalc();
}

function CostBTN() {
    var sub = parseInt(document.getElementById("costbtn").value);
    costCostSub = -sub;
    costSub = -sub;
    CostCalc();
    SPCalc();
}

function DurBTN() {
    var add = parseInt(document.getElementById("durbtn").value);
    DurCalc();
    durCostAdd = add - 3;
    durAdd = add - 3;
    CostCalc();
    SPCalc();
}

const originalDur = durabilityNum; 

function DurCalc() {
    var dur = parseInt(document.getElementById("durbtn").value);
    var battlescarred = document.getElementById("battleScarred");
    var bscount = 0;
    if (battlescarred.checked) {
        bscount++
    }
    durabilityNum = originalDur + (dur - 3) + bscount;
    durability.textContent = durabilityNum;
}

const originalSpeed = speedNum;

function SpeedCalc() {
    var baseSpeed = parseInt(document.getElementById("speedbtn").value);
    var bfs = document.getElementById("builtForSpeed");
    var bfscount = 0;
    if (bfs.checked) {
        bfscount++
    }
    speedNum = originalSpeed + baseSpeed + bfscount;
    speed.textContent = speedNum;
}

const originalSystem = systemNum;

function SystemCalc() {
    var baseSystem = parseInt(document.getElementById("systembtn").value);
    var fc = document.getElementById("fancyComputing");
    var fccount = 0;
    if (fc.checked) {
        fccount++
    }
    systemNum = originalSystem + baseSystem + fccount;
    system.textContent = systemNum;
}

function AirBTN() {
    var airCheck = document.getElementById('air');
    if (airCheck.checked) {
        environmentsList.push(" air");
        environments.textContent = environmentsList;
        CostCalc();
        SPCalc();
    }
    else {
        _.pull(environmentsList, " air");
        environments.textContent = environmentsList;
        CostCalc();
        SPCalc();
    }
}
function LandBTN() {
    var landCheck = document.getElementById('land');
    if (landCheck.checked) {
        environmentsList.push(" land");
        environments.textContent = environmentsList;
        CostCalc();
        SPCalc();
    }
    else {
        _.pull(environmentsList, " land");
        environments.textContent = environmentsList;
        CostCalc();
        SPCalc();
    }
}
function SeaBTN() {
    var seaCheck = document.getElementById('sea');
    if (seaCheck.checked) {
        environmentsList.push(" sea");
        environments.textContent = environmentsList;
        CostCalc();
        SPCalc();
    }
    else {
        _.pull(environmentsList, " sea");
        environments.textContent = environmentsList;
        CostCalc();
        SPCalc();
    }
}

function SizeCost(size) {
    if (size == 2) {
        return 2;
    }
    if (size == 3) {
        return 5;
    }
    else {
        return 0;
    }
}

function CostCalc() {
    var sizeCost = (sizeNum * (sizeNum + 1)) / 2;
    var sizeCostExtra = parseInt(SizeCost(sizeNum));
    var speedCost = SpeedPointCalc();
    var systemCost = SystemPointCalc();
    var costCost = costCostSub;
    var durCost = durCostAdd;
    var envCost = environmentsList.length - 1;
    var custCost = costlyCustomNum;
    var shuttleCost = shuttleNum;

    costNum = originalCost + sizeCost + sizeCostExtra + costCost + durCost + envCost
        + custCost + shuttleCost + speedCost + systemCost;
    cost.textContent = costNum;
}

function SpeedPointCalc() {
    if (document.getElementById('builtForSpeed').checked) {
        return (speedNum - 1) * ((speedNum - 1) + 1) / 2;
    }
    else {
        return speedNum * (speedNum + 1) / 2;
    }
}

function SystemPointCalc() {
    if (document.getElementById('fancyComputing').checked) {
        return (systemNum - 1) * ((systemNum - 1) + 1) / 2;
    }
    else {
        return systemNum * (systemNum + 1) / 2;
    }
}

function SPCalc() {
    var sizePoints = (sizeNum * (sizeNum + 1)) / 2;
    var speedPoints = SpeedPointCalc();
    var systemPoints = SystemPointCalc();
    var costPoints = -costSub;
    var durPoints = durAdd;
    var envPoints = environmentsList.length - 1;
    var custPoints = Math.max((customNum - (crewNum + 1)), 0) * 3;

    pointNum = originalPN - sizePoints - speedPoints - systemPoints
        - costPoints - durPoints - envPoints - custPoints;
    shipPoints.textContent = pointNum;
}

function AddCustomization() {
    customNum++;
    customizations.textContent = customNum;
}

function SubCustomization() {
    customNum--;
    customizations.textContent = customNum;
}

function HandleCustoms(checked, costly) {
    if (checked) {
        AddCustomization();
        if (costly) {
            costlyCustomNum++;
        }
    }
    else {
        SubCustomization();
        if (costly) {
            costlyCustomNum--;
        }
    }
    CostCalc();
    SPCalc();
}

function AddToCustomsList(checkBox, name) {
    if (checkBox.checked) {
        customsList.push(name);
        customizations2.textContent = customsList;
    }
    else {
        _.pull(customsList, name);
        customizations2.textContent = customsList;
    }
}

function ShuttleNum() {
    var shuttleNumber = parseInt(document.getElementById('shuttleNum').value);
    var shuttleCheck = document.getElementById('shuttles');
    if (shuttleCheck.checked) {
        shuttleNum = shuttleNumber;
        CostCalc();
    }
    else {
        shuttleNum = 0;
        CostCalc();
    }
}

//CUSTOMIZATIONS BEGIN//

function AutomatedControls() {
    const checkBox = document.getElementById("automatedControls");
    HandleCustoms(checkBox.checked, true);
    AddToCustomsList(checkBox, ' Automated Controls');
}

function BattleScarred() {
    const checkBox = document.getElementById("battleScarred");
    DurCalc();
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Battle-Scarred');
}

function Brig() {
    const checkBox = document.getElementById("brig");
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Brig');
    }
}

function BroadcastingEquipment() {
    const checkBox = document.getElementById("broadcastingEquipment");
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Broadcasting Equipment');
}

function BuiltForSpeed() {
    const checkBox = document.getElementById("builtForSpeed");
    SpeedCalc();
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Built For Speed');
}

function DataCenter() {
    const checkBox = document.getElementById("dataCenter");
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Data Center');
}

function FancyComputing() {
    const checkBox = document.getElementById("fancyComputing");
    SystemCalc();
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Fancy Computing');
}

function FancyLookin() {
    const checkBox = document.getElementById("fancyLookin");
    HandleCustoms(checkBox.checked, true);
    AddToCustomsList(checkBox, " Fancy-Lookin'");
}

function Flares() {
    const checkBox = document.getElementById("flares");
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Flares');
}

function Garage() {
    const checkBox = document.getElementById('garage');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        Handlecustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Garage');
    }
}

function GrapplerClaws() {
    const checkBox = document.getElementById('grapplerClaws');
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Grappler Claws');
}

function Greenery() {
    const checkBox = document.getElementById('greenery');
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Greenery');
}

function GunnerStation() {
    const checkBox = document.getElementById('gunnerStation');
    HandleCustoms(checkBox.checked, true);
    AddToCustomsList(checkBox, ' Gunner Station');
}

function HeavierThanSheLooks() {
    const checkBox = document.getElementById('heavierThanSheLooks');
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Heavier Than She Looks');
}

function InternalSecurity() {
    const checkBox = document.getElementById("internalSecurity");
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, true);
        AddToCustomsList(checkBox, ' Internal Security');
    }
}

function Medbay() {
    const checkBox = document.getElementById('medbay');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Medbay');
    }
}

function OffTheGrid() {
    const checkBox = document.getElementById('offTheGrid');
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, ' Off The Grid');
}

function Parlor() {
    const checkBox = document.getElementById('parlor');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Parlor');
    }
}

function PassengersQuarters() {
    const checkBox = document.getElementById('passengersQuarters');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, " Passenger's Quarters");
    }
}

function ResearchCenter() {
    const checkBox = document.getElementById('researchCenter');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Research Center');
    }
}

function Shuttles() {
    const checkBox = document.getElementById('shuttles');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        ShuttleNum();
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Shuttles');
    }
}

function SmugglersHold() {
    const checkBox = document.getElementById('smugglersHold');
    HandleCustoms(checkBox.checked, false);
    AddToCustomsList(checkBox, " Smuggler's Hold");
}

function StealthShielding() {
    const checkBox = document.getElementById('stealthShielding');
    HandleCustoms(checkBox.checked, true);
    AddToCustomsList(checkBox, ' Stealth Shielding');
}

function TrainingRoom() {
    const checkBox = document.getElementById('trainingRoom');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Training Room');
    }
}

function Workshop() {
    const checkBox = document.getElementById('workshop');
    if (checkBox.checked && sizeNum < 1) {
        checkBox.checked = false;
    }
    else {
        HandleCustoms(checkBox.checked, false);
        AddToCustomsList(checkBox, ' Workshop');
    }
}
