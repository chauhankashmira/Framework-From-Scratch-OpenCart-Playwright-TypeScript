//Two functions,
//  one function will return data from JSON
//  another function will return data from CSV


import fs from "fs"; //built-in module in JS/TS
import {parse} from "csv-parse/sync" ; //csv-parse will install earlier

export class DataProvider {

    static getTestDataFromJson (filePath:string) : any[]
     {
      let data:any = JSON.parse(fs.readFileSync(filePath, 'utf8') ); //datatype should be any because it always returns array for json file
        return data;
    }

    static getTestDataFromCSV (filePath:string) {

       let data:any = parse (fs.readFileSync(filePath), {columns:true, skip_empty_lines:true} )
        return data;

    }

}


