/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-06-21 10:01:08
 * @ Modified on: 2020-06-22 11:20:07
 * 
 * @version 1.0
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