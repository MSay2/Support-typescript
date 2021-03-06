/**
 * @ Author: Yoann Meclot. MSay2
 * @ Created on: 2020-05-25 10:35:10
 * @ Modified on: 2020-09-22 07:21:00
 * 
 * @version 1.2
 */

/**
 * Copyright (c) 2020 MSay2, Yoann Meclot - OnClickListener.ts
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
 * On click listener event
 * 
 * @class OnClickListener
 * @version 1.3
 * @since 1.0
 */
export interface OnClickListener
{
    onClick(view:HTMLElement):void;
}