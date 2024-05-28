package com.wisedu.emap.util;

import self.micromagic.eterna.dao.preparer.ValuePreparer;
import self.micromagic.eterna.search.BuilderResult;
import self.micromagic.eterna.search.ConditionProperty;
import self.micromagic.eterna.share.EternaException;
import self.micromagic.util.AbstractConditionBuilder;

public class instrBuilder extends AbstractConditionBuilder{

	@Override
	public BuilderResult buildeCondition(String colName, Object value,
			ConditionProperty cp) throws EternaException {
		ValuePreparer[] arr =new ValuePreparer[2];
		arr[0]=this.createValuePreparer(cp, value);
		arr[1]=this.createValuePreparer(cp, "test");
		return new BuilderResult(" instr("+colName+",?)",arr);
	}

}
