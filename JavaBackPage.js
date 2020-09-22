var classpromise = d3.json("classData.json");

var successFCN = function(information) {
    console.log("Class Data", information);
    tablefill(information);
    sortfinals(information);
}
var failFCN = function(error) {
    console.log("Got no data", error)
}



var grade = function(value) {
    return value.grade;
}
var clearTable = function()
{
    d3.selectAll("#myTable tbody tr")
        .remove();
}

var tablefill = function(information) {
var rows =
    d3.select("#myTable tbody")
    .selectAll("tr")
    .data(information)
    .enter()
    .append("tr")

rows.append("td")
    .append("img")
    .attr("src", function(image){
          console.log("this")
    return "imgs/"+image.picture;
          })
rows.append("td")
    .text(function(information){return d3.mean(information.quizes.map(grade))})
rows.append("td")
    .text(function(information){return d3.mean(information.homework.map(grade))})
rows.append("td")
    .text(function(information){return d3.mean(information.test.map(grade))})
rows.append("td")
    .text(function(information){return information.final.map(grade)})
}



var sortfinals = function(informations) {
    d3.select("#fg")
    .on("click", function()
        {
        console.log("clicked");
        informations.sort(function(penguinA,penguinB)
        {
            if(penguinA.final[0].grade > penguinB.final[0].grade){return 1;}
            else if(penguinA.final[0].grade < penguinB.final[0].grade){return -1;}
            else{return 0;}
        })
        console.log(informations);
            clearTable();
    tablefill(informations);
    });
}

//informations.sort(function())


classpromise.then(successFCN,failFCN);