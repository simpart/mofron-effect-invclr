/**
 * @file mofron-effect-invclr/index.js
 * @brief invert color effect 
 * @author simpart
 */
const mf    = require('mofron');
const evInv = require('mofron-event-invclr');
/**
 * @class Invclr
 * @brief invert color effect class
 */
mf.effect.Invclr = class extends mf.Effect {
    
    constructor (po, p2) {
        try {
            super();
            this.name('Invclr');
            this.prmMap(['targetComp', 'targetColor']);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set component and target color for invert event
     * it is target event for kick this effect
     * 
     * @param cmp (Component) target invert component
     * @param tgt (string) target invert color, it kicks this effect when this parameter inverts.
     * @return 
     */
    targetComp (cmp, tgt) {
        try {
            if (true !== mf.func.isInclude(cmp, 'Component')) {
                throw new Error('invalid parameter');
            }
            let ev_inv = new evInv({
                targetColor : tgt,
                kickEffect  : this
            });
            cmp.execOption({ event : ev_inv });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter for effect target color
     * this color will chenge when target color was invert
     * 
     * @param tgt (string) css color key, default key is 'background'
     * @return (string) css color key
     */
    targetColor (tgt) {
        try { return this.member('targetColor', 'string', tgt, 'background'); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effect contents
     *
     * @note private method
     */
    contents (flg, cmp) {
        try {
            super.contents(flg, cmp);
            if ( ("mainColor"   === this.targetColor()) ||
                 ("baseColor"   === this.targetColor()) ||
                 ("accentColor" === this.targetColor()) ) {
                cmp[this.targetColor()](this.enableColor());
            } else {
                cmp.tgtColor(this.targetColor(), (true === flg) ? this.enableColor() : this.disableColor());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp) {}
    disable (cmp) {}
    
    /**
     * setter/getter for enable color
     * this color will set when target color of targetComp was invert
     * 
     */
    enableColor (clr) {
        try {
            return this.member(
                'enableColor',
                'Color',
                (undefined === clr) ? undefined : mf.func.getColor(clr),
                new mf.Color(255,255,255)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter for enable color
     * this color will set when target color of targetComp returned from invert
     * 
     * @param
     */
    disableColor (prm) {
        try {
            return this.member(
                'disableColor',
                new mf.Color(0,0,0),
                (undefined === prm) ? prm : mf.func.getColor(prm)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.effect.Invclr;
/* end of file */
