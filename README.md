Pixel Perfect and BoundingBox Collision Detector for EaselJS Bitmaps and BitmapAnimations

## Namespace

The default namespace is 'ndgmr':
To check for a collision between to Bitmaps and/or BitmapAnimations

## Example: Rectangular / BoundingBox Collision
	var intersection = ndgmr.checkRectCollision(bitmap1,bitmap2);
	// intersection is null if no collision, otherwise a {x,y,width,height}-Object is returned

## Pixel Perfect Collision Example
	var collision = ndgmr.checkPixelCollision(bitmap1,bitmap2,alphaThreshold,true);
	// returns a rect with the global position of the colliding pixel(s)
	// alphaThreshold default is 0, set to higher value to ignore collisions with semi transparent pixels
	// the last parameter defines if all pixels should be checked, in this case it returns a
	// rect with the size of the full collision, if false a rect with the size 1x1 is returned

## Debugging
	// To add debug-output on page use:
	ndgmr.DEBUG_COLLISION = true;
	// OR
	ndgmr.DEBUG = true;

- - -

http://www.indiegamr.com

All code and examples are released under an MIT License

The MIT License

Copyright (c) 2013 Olaf Horstmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.