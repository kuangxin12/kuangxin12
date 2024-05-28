package com.wisedu.emap.util;

public class Constants {

	/**
	 * 基本信息表状态：0：申请未通过；1：未年审；2：已关闭；3:申请出口审核中；4：年审审核中；5:年审未通过；6：关闭出口审核中；7：维护申请中；8：变更申请中；9：关闭申请中；；10：申请成功；11：申请出口未通过；12：关闭出口未通过；10：年审通过
	 */
	 /**
     *  徐康2019/10/15 16:35修改
	 * 基本信息表状态：0：申请未通过；1：未年审；2：已关闭；3:申请出口审核中；4.关闭出口审核中；5:年审未通过；6：年审审核中；7：维护申请中；8：变更申请中；9：关闭申请中；10：申请成功；11：申请出口未通过；12：关闭出口未通过；20：年审通过
	 */
	public static enum JBXX_ZT {
		SQWTG(0), WNS(1), YGB(2),NSSQZ(3),NSSHZ(4),NSWTG(5), SQTG(10), NSTG(20);

		private final int value;

		// 构造器默认也只能是private, 从而保证构造函数只能在内部使用
		private JBXX_ZT(int value) {
			this.value = value;
		}

		public int getValue() {
			return value;
		}
	}

}
