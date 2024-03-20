import React from 'react'
import Navbar from '../comps/Navbar'
import styles from '../styles/about.module.css'
import Head from 'next/head'
import { GoPlay } from "react-icons/go"
function about() {
    return (
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <div className={styles.main}>
                <section className={styles.whoWeAre}>
                    <div className={styles.backgroundElement}>
                        <Navbar color={"transparent"} page='abt' />
                        <div className={styles.whoWeAreDiv}>
                            <h1>Who We Are</h1>
                            <div className={styles.WhoAreWeBanner}>
                                <div className={styles.bPMaskDiv}>
                                    <div className={styles.bPVideo}><GoPlay />Watch Full Video</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.exploreStories}>
                    <div className={styles.exploreStoriesContent}>
                        <h1>Explore The Stories</h1>
                        <div className={styles.aboutCardContent}>
                            <div className={styles.dualCards}>
                                <div className={styles.smallCard} style={{ backgroundImage: 'url(../2002.jpg)' }}>
                                    <div className={styles.maskSmall}>
                                        <h2>Get & Go</h2>
                                        <p>2002</p>
                                    </div>
                                </div>
                                <div className={styles.smallCard} style={{ backgroundImage: 'url(../2004-2.jpg)' }}>
                                    <div className={styles.maskSmall}>
                                        <h2>First Garage & Shop</h2>
                                        <p>2004</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.singleCard} style={{ backgroundImage: 'url(../2005-1.jpg)' }}>
                                <div className={styles.maskSingle}>
                                    <h2>First Cycle Launched</h2>
                                    <p>2005</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.aboutCardContentReverse}>
                            <div className={styles.dualCards}>
                                <div className={styles.smallCard} style={{ backgroundImage: 'url(../2008.jpg)' }}>
                                    <div className={styles.maskSmall}>
                                        <h2>100+ Service Netwroks</h2>
                                        <p>2008</p>
                                    </div>
                                </div>
                                <div className={styles.smallCard} style={{ backgroundImage: 'url(../today.jpg)' }}>
                                    <div className={styles.maskSmall}>
                                        <h2>50+ Models & Accessories</h2>
                                        <p>Today</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.singleCard} style={{ backgroundImage: 'url(../2005-2.jpg)' }}>
                                <div className={styles.maskSingle}>
                                    <h2>First #GoEcoBiking Event</h2>
                                    <p>2005</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={styles.ourProcess}>
                    <h1>Our Process</h1>
                    <div className={styles.processDec}>
                        <div className={styles.processSteps}>
                            <h3>01.</h3>
                            <h2>Research</h2>
                            <p>Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam corper.</p>
                        </div>
                        <div className={styles.processSteps}>
                            <h3>02.</h3>
                            <h2>Idea & Concept</h2>
                            <p>Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam corper.</p>
                        </div>
                        <div className={styles.processSteps}>
                            <h3>03.</h3>
                            <h2>Design & Production​</h2>
                            <p>Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam corper.</p>
                        </div>
                        <div className={styles.processSteps}>
                            <h3>04.</h3>
                            <h2>Sales & Service​</h2>
                            <p>Lorem ipsum dolor sit amet, consec tetur elit. Ut elit tellus, luctus nec ullam corper.</p>
                        </div>
                    </div>
                </section>
                <section className={styles.bikingProgram}>
                    <div className={styles.bikingProgramContent}>
                        <h1>Join #GoEcoBiking Programme</h1>
                        <div className={styles.bikingProgramBanner}>
                            <div className={styles.bPMaskDiv}>
                                <div className={styles.bPVideo}><GoPlay />Watch Full Video</div>
                            </div>
                        </div>
                        <div className={styles.bikingProgramText}>
                            <div className={styles.bikingProgramAbout}>
                                <h2>Duis aute irure dolor in reprehenderit velit.</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                            </div>
                            <div className={styles.bikingProgramBtn}><button>Join The Programme</button></div>
                        </div>
                    </div>
                </section>
                <section className={styles.buyNowX26}>
                    <div className={styles.backgroundElement}>
                        <div className={styles.buyNowX26Content}>
                            <span>The All New</span>
                            <h1>Kryo X26 MTB Is Here</h1>
                            <p>Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris in erat justo.</p>
                            <button className={styles.buyNowBtn}>Buy Now</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default about