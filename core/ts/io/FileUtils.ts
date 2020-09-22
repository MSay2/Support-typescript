/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-27 10:35:27
 * @ Modified on: 2020-09-22 07:25:11
 * 
 * @version 1.1
 */

/**
 * Copyright (c) 2020 MSay2, Yoann Meclot - FileUtils.ts
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { UString } from "../helper/Utils.js";

/**
 * This utility is a mean for contains methods for the Files.
 * 
 * @class FileUtils
 * @version 1.1
 * @since 1.0
 */
export class FileUtils
{
    /**
     * Get the extension of file name
     * 
     * @param path name or canonical path
     * @returns return the extension name of your file name or canonical path
     * @type {string}
     * @since 1.0
     */
    public static getExtension(path:string):string
    {
        if (path != null)
        {
            let extension:string = "";
            let i:number = path.lastIndexOf('.');
            if (i > 0 &&  i < path.length -1)
            {
                extension = path.substring(i + 1).toLowerCase();
            }
            return extension;
        }
        return "";
    }

    /**
     * Remove the extension of file name
     * 
     * @param name name or canonical path
     * @returns return the name or canonical path without the extension
     * @type {string}
     * @since 1.0
     */
    public static removeExtension(name:string):string
    {
        if (!UString.isEmpty(name))
        {
            return name.replace(name.substring(name.lastIndexOf("."), name.length), "");
        }
        return name;
    }
}