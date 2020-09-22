/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-06-21 10:01:08
 * @ Modified on: 2020-09-22 07:18:46
 * 
 * @version 1.1
 */

/**
 * Copyright (c) 2020 MSay2, Yoann Meclot - Exceptions.ts
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

/**
 * Class NullPointerException is called for the values is null.
 * 
 * @class NullPointerException
 * @version 1.0
 * @since 1.0
 */
export class NullPointerException extends Error 
{
    public constructor(message:string)
    {
        super(message);
        this.name = "NullPointerException";
    }
}

/**
 * Class IllegalArgumentException is called for the illegal argument (or using methods).
 * 
 * @class IllegalArgumentException
 * @version 1.0
 * @since 1.0
 */
export class IllegalArgumentException extends Error 
{
    public constructor(message:string)
    {
        super(message);
        this.name = "IllegalArgumentException";
    }
}

/**
 * Class ObjectCastException is called for the values is non cast to another object.
 * 
 * @class ObjectCastException
 * @version 1.0
 * @since 1.0
 */
export class ObjectCastException extends Error 
{
  public constructor(message:string)
  {
      super(message);
      this.name = "ObjectCastException";
  }
}

/**
 * Class MaximumCapacityException is called has the moment a problem of capacity is occurred.
 * 
 * @class MaximumCapacityException
 * @version 1.0
 * @since 1.0
 */
export class MaximumCapacityException extends Error 
{
    public constructor(message:string)
    {
        super(message);
        this.name = "MaximumCapacityException";
    }
}

/**
 * Class IllegalStateException is called has the moment a problem in your internal code
 * 
 * For convention, use this for debug your poject
 * 
 * @class IllegalStateException
 * @version 1.0
 * @since 1.1
 */
export class IllegalStateException extends Error
{
    public constructor(message:string)
    {
        super(message);
        this.name = "IllegalStateException";
    }
}