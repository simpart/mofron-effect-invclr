/**
 * @file mofron-effect-invclr/index.js
 * @author simpart
 */
const mf    = require('mofron');
const evInv = require('mofron-event-invclr');

/**
 * @class Invclr
 * @brief invert color effect class
 */
mf.effect.Invclr = class extends mf.Effect {
    
    constructor (po, p2, p3) {
        try {
            super();
            this.name('Invclr');
            this.prmMap('invertEvent', 'colorTgt');
            this.prmOpt(po, p2, p3);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    invertEvent (prm, tgt) {
        try {
            let ret = this.member('invertEvent', new evInv(), prm);
            if (undefined !== prm) {
                if (true !== mf.func.isInclude(tgt, 'Component')) {
                    throw new Error('invalid parameter');
                }
                tgt.execOption({ event : prm })
                prm.kickEffect(this);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    colorTgt (prm) {
        try {
            return this.member('colorTgt', 'background', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (flg, cmp) {
        try {
            super.contents(flg, cmp);
            if ( ("mainColor"   === this.colorTgt()) ||
                 ("baseColor"   === this.colorTgt()) ||
                 ("accentColor" === this.colorTgt()) ) {
                cmp[this.colorTgt()](this.enableColor());
            } else {
                cmp.tgtColor(this.colorTgt(), (true === flg) ? this.enableColor() : this.disableColor());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp) {}
    disable (cmp) {}
    
    enableColor (prm) {
        try {
            return this.member(
                'enableColor',
                new mf.Color(255,255,255),
                (undefined === prm) ? prm : mf.func.getColor(prm)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
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
