let townManager = (function() {
    
    class Town {
        constructor(parks = [], streets = []) {
            this.parks = parks;
            this.streets = streets;
        }

        addPark(...park) {
            for (let p of park) {
                this.parks.push(p);
            }
        }

        addStreet(...street) {
            for (let s of street) {
                this.streets.push(s);
            }
        }
    };
    
    class Park {
        constructor(name, year, treeNumber, area) {
            this.name = name;
            this.year = year;
            this.treeNumber = treeNumber;
            this.area = area;
            this.age = new Date().getFullYear() - this.year;
        }

        getTreeDensity() {
            return (this.treeNumber / this.area).toFixed(2);
        }
    };
    //tiny -> 1/ small -> 5/ normal -> 10/ big -> 20/ huge -> 30
    class Street {
        constructor(name, year, length) {
            
            let streetProperties = new Map([
                [1, 'tiny'],
                [5, 'small'],
                [10, 'normal'],
                [20, 'big'],
                [30, 'huge']
            ]);
            let classify = function(properties, length) {
                let result;
                properties.forEach((value, key)=> {
                    if (key <= length) {
                        result = value;
                    }
                });
                return result;
            };
            this.name = name;
            this.year = year;
            this.length = length;
            this.classification = this.length ? classify(streetProperties, this.length) : 'normal';
        }
    };

    let parks = [new Park('Golden Gate', 1978, 3400, 1500), 
                 new Park('Gorky', 1983, 2500, 1500), 
                 new Park('Shevchenko', 1979, 1900, 1200), 
                 new Park('Zustrich', 1969, 800, 700)];
    
    let streets = [new Street('Market', 1910, 22),
                  new Street('Sumska', 1923),
                  new Street('Baker', 1934, 31)];
    let town = new Town(parks, streets);
    
    let getEachParkTreeDensity = function(parks) {
        parks.forEach((current)=> {
            console.log(`Park: ${current.name}, tree density: ${current.getTreeDensity()}`);
        });
    };
    
    let getAverageAge = function(parks) {
        return parks
            .map(current => current.age)
            .reduce((total, cur)=> total + cur) / parks.length;
    };
    
    let getParksWith1000Trees = function(parks) {
        return parks.filter((cur)=> cur.treeNumber > 1000);
    };
    
    let getAverageStreetLength = function(streets) {
        return streets
            .map(current=> current.length)
            .reduce((total, cur)=> total + cur) / streets.length;
    };
    
    let getStreetClassification = function(streets) {
        streets.forEach((current)=> {
            console.log(`${current.name} : ${current.classification}`)
        });
    };
    
    
    return {
        getFinalReport: function() {
            console.log("Here is the final report");
            getEachParkTreeDensity(parks);
            console.log(`Park average age: ${getAverageAge(parks)} years`);
            console.log(`Parks that have 1000+ trees`);
            getParksWith1000Trees(parks).forEach(cur=> console.log(cur.name));
            console.log(`Street average length: ${getAverageStreetLength(streets).toFixed(2)} km`);
            getStreetClassification(streets);
            
        },
        
        addPark: function(name, year, treeNumber, area) {
            town.addPark(new Park(name, year, treeNumber, area));
        },
        
        addStreet: function(name, year, length, classification = 'normal') {
            town.addStreet(new Street(name, year, length, classification));
        }
    };
    
})();


townManager.getFinalReport();
























